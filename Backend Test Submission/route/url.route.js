const express = require('express');
const { createShortUrl, getShortUrlStats } = require('../controller/url.controller');

const router = express.Router();

router.post('/', createShortUrl);
router.get('/:shortcode', getShortUrlStats);

module.exports = router;
