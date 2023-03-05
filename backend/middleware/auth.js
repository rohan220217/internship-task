const jwt = require("jsonwebtoken");
const fs = require("fs");
const { sendSuccess, sendError } = require("../utils/messageHandler");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return sendError({
      res,
      code: 401,
      msg: "Access Denied. Authentication failed.",
    });
    
  try {
    const publicKey = fs.readFileSync(
      `${__dirname}/../credentials/jwtkeys/public.key`,
      "utf8"
    );
    const verifyOptions = {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
      subject: this.userEmail,
      expiresIn: "7d",
      algorithm: "RS256",
    };

    const decoded = jwt.verify(token, publicKey, verifyOptions);
    req.user_token_details = decoded;
    next();
  } catch (ex) {
    return sendError({
      res,
      msg: "Error: Please logout and login again",
    });
  }
}

module.exports = auth;
