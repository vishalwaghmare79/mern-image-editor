const { verifyToken } = require('../utils/userUtils');
const asyncHandler = require('./asyncHandler');

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next({ statusCode: 401, message: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(' ')[1];
  
  const decoded = verifyToken(token);

  if (!decoded) {
    return next({ statusCode: 401, message: "Unauthorized: Invalid or expired token" });
  }

  req.user = decoded;
  next();
});

module.exports = authenticate;
