module.exports = {
  UrlEntry: class {
    constructor(shortcode, originalUrl, createdAt, expiresAt) {
      this.shortcode = shortcode;
      this.originalUrl = originalUrl;
      this.createdAt = createdAt;
      this.expiresAt = expiresAt;
      this.clicks = [];
    }
  }
};
