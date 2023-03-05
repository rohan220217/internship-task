// Error msg
function sendError({ res, code = 400, msg = "Error" }) {
  return res.status(code).send({
    success: false,
    msg,
  });
}

// success msg
function sendSuccess({ res, code = 200, msg = "Success", data }) {
  return res.status(code).send({
    success: true,
    msg,
    data,
  });
}

module.exports = {
  sendError,
  sendSuccess,
};
