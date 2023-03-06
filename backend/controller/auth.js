const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { asyncErrorMiddleware } = require("../middleware/async_helper");
const { sendSuccess, sendError } = require("../utils/messageHandler");
const hash = require("../utils/hash");

const loginUser = asyncErrorMiddleware(async (req, res) => {
  let { userEmail, userPassword } = req.body;

  // Only active user
  let user = await User.findOne({
    userEmail: userEmail.toLowerCase(),
    userStatus: "Active",
  });

  if (!user) return sendError({ res, msg: "Invalid useremail or password" });

  const validPassword = await bcrypt.compare(userPassword, user.userPassword);
  if (!validPassword)
    return sendError({ res, msg: "Invalid useremail or password" });

  const userToken = user.generateAuthToken();

  let resObj = {
    userName: user.userName,
    userEmail: user.userEmail,
    isAdmin: user.isAdmin,
    userStatus: user.userStatus,
    token: userToken,
    _id: user._id,
    userId: user.userId,
  };

  return sendSuccess({ res, data: resObj, msg: "Successfully loggedIn" });
});

const forgotPassword = asyncErrorMiddleware(async (req, res) => {
  const { userEmail, oldPassword, newPassword } = req.body;

  let user = await User.findOne({
    userEmail: userEmail.toLowerCase(),
    userStatus: "Active",
  });
  if (!user) return sendError({ res, msg: "Invalid useremail or password" });

  const validPassword = await bcrypt.compare(oldPassword, user.userPassword);

  if (!validPassword)
    return sendError({ res, msg: "Invalid useremail or password" });

  const updatedNewPassword = await hash(newPassword);
  user.userPassword = updatedNewPassword;

  await user.save();

  return sendSuccess({ res, msg: "Password Updated Successfully" });
});

module.exports = {
  loginUser,
  forgotPassword,
};
