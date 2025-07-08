const { generateShortcode } = require('../utils/shortCode');
const { isValidUrl } = require('../utils/urlValidator');
const { log } = require('../logger/logger');
const { saveUrl, isShortcodeTaken, getUrl } = require('../repository/url.repo');
const { UrlEntry } = require('../domain/url');

async function createShortUrl(req, res) {
  const { url, validity = 30, shortcode } = req.body;
  if (!url || !isValidUrl(url)) {
    await log('backend', 'warn', 'controller', 'Invalid or missing URL');
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  let code = shortcode || generateShortcode();
  if (!/^[a-zA-Z0-9]{1,10}$/.test(code)) {
    await log('backend', 'warn', 'controller', 'Invalid shortcode format');
    return res.status(400).json({ error: 'Shortcode must be alphanumeric and <= 10 chars' });
  }

  if (isShortcodeTaken(code)) {
    await log('backend', 'error', 'repository', `Shortcode '${code}' already exists`);
    return res.status(409).json({ error: 'Shortcode already in use' });
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + validity * 60000);

  const entry = new UrlEntry(code, url, now.toISOString(), expiresAt.toISOString());
  saveUrl(entry);
  await log('backend', 'info', 'controller', `Short URL created with code ${code}`);

  res.status(201).json({
    shortLink: `http://${req.headers.host}/${code}`,
    expiry: entry.expiresAt
  });
}

async function getShortUrlStats(req, res) {
  const { shortcode } = req.params;
  const entry = getUrl(shortcode);

  if (!entry) {
    await log('backend', 'warn', 'controller', `Shortcode '${shortcode}' not found`);
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  res.status(200).json({
    shortcode: entry.shortcode,
    originalUrl: entry.originalUrl,
    createdAt: entry.createdAt,
    expiresAt: entry.expiresAt,
    clicks: entry.clicks.length,
    clickDetails: entry.clicks
  });
}

async function redirectShortUrl(req, res) {
  const { shortcode } = req.params;
  const entry = getUrl(shortcode);

  if (!entry) {
    await log('backend', 'warn', 'controller', `Redirection failed - shortcode '${shortcode}' not found`);
    return res.status(404).send('Shortcode not found');
  }

  const now = new Date();
  if (now > new Date(entry.expiresAt)) {
    await log('backend', 'warn', 'controller', `Redirection failed - shortcode '${shortcode}' expired`);
    return res.status(410).send('Shortened URL has expired');
  }

  // Optionally record click details (timestamp, referrer, etc.)
  entry.clicks.push({
    timestamp: now.toISOString(),
    referrer: req.get('Referrer') || 'Direct',
    location: 'India' // You could enhance this with real IP geo lookup later
  });

  await log('backend', 'info', 'controller', `Redirecting shortcode '${shortcode}'`);
  res.redirect(entry.originalUrl);
}

module.exports = {
  createShortUrl,
  getShortUrlStats,
  redirectShortUrl // ✅ export this too!
};
