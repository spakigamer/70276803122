const express = require('express');
const router = express.Router();
const { getUrl } = require('../repository/url.repo');

router.get('/:shortcode', (req, res) => {
  const { shortcode } = req.params;
  const entry = getUrl(shortcode);

  if (!entry) {
    return res.status(404).send('Shortcode not found');
  }

  const now = new Date();
  const expiry = new Date(entry.expiresAt);
  if (now > expiry) {
    return res.status(410).send('Shortcode has expired');
  }

  // Track click (optional)
  entry.clicks.push({
    timestamp: now.toISOString(),
    referrer: req.headers.referer || 'direct',
    location: 'India', // stubbed for now
  });

  res.redirect(entry.originalUrl);
});

module.exports = router;
