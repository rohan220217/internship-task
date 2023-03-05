const Joi = require("joi");

const validateAnalytics = function (user) {
  const schema = Joi.object({
    userId: Joi.number().required(),
    website: Joi.string().required().trim(),
    adRevenueDollars: Joi.number().required(),
    adImpressions: Joi.number().required(),
    avgSiteViewingTime: Joi.number().required(),
    totalClicks: Joi.number().required(),
  });

  return schema.validate(user);
};

module.exports = {
  validateAnalytics,
};
