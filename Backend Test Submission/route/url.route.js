const express = require('express');
const router = express.Router();
const { createShortUrl, getShortUrlStats, redirectShortUrl } = require('../controller/url.controller');

// Existing routes
router.post('/', createShortUrl);
router.get('/:shortcode', getShortUrlStats);

// ✅ New redirection route (MUST BE LAST or BEFORE stats depending on conflict)
router.get('/:shortcode', redirectShortUrl);

module.exports = router;
