class AvatarError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 413;
  }
}

module.exports = AvatarError;