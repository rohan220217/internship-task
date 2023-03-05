const { sendError } = require("../utils/messageHandler");

const handleError = (err, req, res, next) => {
    console.error(err);

    return sendError({
        res,
        code: 500,
        msg: "Server Error: Something went wrong",
      });
    };

module.exports = handleError;