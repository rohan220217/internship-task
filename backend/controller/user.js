const { User } = require("../models/user");
const hash = require("../utils/hash");

//Validation
const { validateUser, validateUserEdit } = require("../validate/user.js");

const { asyncErrorMiddleware } = require("../middleware/async_helper");
const { sendSuccess, sendError } = require("../utils/messageHandler");

const createUser = asyncErrorMiddleware(async (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error)
    return sendError({
      res,
      msg: error.details[0].message,
    });

  let user = await User.findOne({
    userEmail: value.userEmail.toLowerCase(),
  }).lean();

  if (user)
    return sendError({
      res,
      msg: "User already exists.",
    });

  // const userObj = { ...value, userPassword: await hash(value.userPassword) };
  const userObj = { ...value };
  userObj.userEmail = value.userEmail.toLowerCase();

  user = new User(userObj);

  await user.save();

  return sendSuccess({
    res,
    msg: "Successfully user created",
    data: user,
  });
});

const updateUser = asyncErrorMiddleware(async (req, res) => {
  const { error, value } = validateUserEdit(req.body);
  if (error)
    return sendError({
      res,
      msg: error.details[0].message,
    });

  let user = await User.findOne({
    _id: req.params._id,
  });

  if (!user)
    return sendError({
      res,
      msg: "Invalid user",
    });

  user.set({ ...value });
  await user.save();

  const userobj = user.toObject();
  delete userobj.userPassword;

  return sendSuccess({
    res,
    msg: "Successfully user updated",
    data: userobj,
  });
});

const getAllUsers = asyncErrorMiddleware(async (req, res) => {
  const users = await User.find().select("-userPassword -isAdmin").lean();
  if (!users) return sendError({ res, code: 404, msg: "No users found" });

  return sendSuccess({ res, msg: "All users fetched", data: users });
});

const getUserDetails = asyncErrorMiddleware(async (req, res) => {
  const user = await User.findById(req.params._id)
    .select("-userPassword -isAdmin")
    .lean();
  if (!user) return sendError({ res, code: 404, msg: "No user found" });

  return sendSuccess({ res, msg: "User detail fetched", data: user });
});

const deleteUser = asyncErrorMiddleware(async (req, res) => {
  const user = await User.deleteOne({ _id: req.params._id });
  if (!user) return sendError({ res, code: 404, msg: "No user found" });

  return sendSuccess({
    res,
    data: user,
    msg: "User deleted successfully",
  });
});

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  getUserDetails,
  deleteUser,
};
