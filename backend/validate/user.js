const Joi = require("joi");

const validateUser = function (user) {
  const schema = Joi.object({
    userName: Joi.string().required().trim(),
    userEmail: Joi.string().email().required().trim(),
    isAdmin: Joi.boolean().optional(),
    userCompany: Joi.string().required().trim(),
    userRevenuePercent: Joi.number().min(0).max(100).required(),
    userStatus: Joi.string().optional(),
    userPassword: Joi.string().required().trim(),
  });

  return schema.validate(user);
};

const validateUserEdit = function (user) {
  const schema = Joi.object({
    userName: Joi.string().required().trim(),
    userCompany: Joi.string().required().trim(),
    userRevenuePercent: Joi.number().min(0).max(100).required(),
    userStatus: Joi.string().required(),
  });

  return schema.validate(user);
};

module.exports = {
  validateUser,
  validateUserEdit,
};
