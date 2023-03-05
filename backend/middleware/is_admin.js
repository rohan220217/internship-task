const { sendError } = require("../utils/messageHandler");

//For instructor
function instructor(req, res, next) {
  if (req.user_token_details.isAdmin) {
    next();
  } else {
    return sendError({
      res,
      code: 401,
      msg: "Access Denied. Only available for admin",
    });
  }
}

module.exports = instructor;