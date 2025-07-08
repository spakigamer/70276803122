const { UrlEntry } = require('../domain/url');

const urlDB = new Map();

function saveUrl(entry) {
  urlDB.set(entry.shortcode, entry);
}

function getUrl(shortcode) {
  return urlDB.get(shortcode);
}

function isShortcodeTaken(code) {
  return urlDB.has(code);
}

function addClick(shortcode, detail) {
  const entry = urlDB.get(shortcode);
  if (entry) {
    entry.clicks.push(detail);
  }
}

module.exports = { saveUrl, getUrl, isShortcodeTaken, addClick };
