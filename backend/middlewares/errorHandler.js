const AvatarError = require("../errors/AvatarError");
const BadRequestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");
const ForbiddenError = require("../errors/ForbiddenError");
const ManyRequestsError = require("../errors/ManyRequestsError");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const { AUTH_ERR, INTERNAL_SERVER_ERR, AVATAR_ERR, FORBIDDEN_ERR, MANY_REQUESTS_ERR, UNAUTHORIZED_ERR } = require("../utils/constants");

module.exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || err.status || 500;
  let userMessage = err.message;

  if (!userMessage) {
    if (err instanceof UnauthorizedError) {
      userMessage = UNAUTHORIZED_ERR;
    } else if (err instanceof ConflictError) {
      userMessage = CONFLICT_ERR;
    } else if (err instanceof BadRequestError) {
      userMessage = BAD_REQUEST_ERR;
    } else if (err instanceof NotFoundError) {
      userMessage = NOT_FOUND_ERR;
    } else if (err instanceof AvatarError) {
      userMessage = AVATAR_ERR;
    } else if (err instanceof ForbiddenError) {
      userMessage = FORBIDDEN_ERR;
    } else if (err instanceof ManyRequestsError) {
      userMessage = MANY_REQUESTS_ERR;
    } else {
      userMessage = INTERNAL_SERVER_ERR;
    }
  }

  res.status(status).json({ message: userMessage });
  next();
};    