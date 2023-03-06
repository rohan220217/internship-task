const { asyncErrorMiddleware } = require("../middleware/async_helper");
const { sendSuccess, sendError } = require("../utils/messageHandler");
const { Analytics } = require("../models/analytics.js");
const { validateAnalytics } = require("../validate/analytics.js");

const createAnalytics = asyncErrorMiddleware(async (req, res) => {
  const { error, value } = validateAnalytics(req.body);
  if (error)
    return sendError({
      res,
      msg: error.details[0].message,
    });

  let analytic = await Analytics.findOne({
    userId: value.userId,
    website: value.website.trim(),
  }).lean();

  if (analytic)
    return sendError({
      res,
      msg: "Analytic already exists.",
    });

  const analyticObj = { ...value, website: value.website.trim() };

  analytic = new Analytics(analyticObj);

  await analytic.save();

  return sendSuccess({
    res,
    msg: "Successfully analytic created",
    data: analytic,
  });
});

const updateAnalytics = asyncErrorMiddleware(async (req, res) => {
  const { error, value } = validateAnalytics(req.body);
  if (error)
    return sendError({
      res,
      msg: error.details[0].message,
    });

  let analytic = await Analytics.findOne({
    _id: req.params._id,
    userId: value.userId,
    website: value.website.trim(),
  });

  if (!analytic)
    return sendError({
      res,
      msg: "Can't update anaytics.",
    });

  const analyticObj = { ...value, website: value.website.trim() };

  analytic.set({ ...analyticObj });
  await analytic.save();

  return sendSuccess({
    res,
    msg: "Successfully analytics updated",
    data: analytic,
  });
});

const getAllAnalytics = asyncErrorMiddleware(async (req, res) => {
  const analytics = await Analytics.find().lean();
  if (!analytics)
    return sendError({ res, code: 404, msg: "No analytics found" });

  return sendSuccess({ res, msg: "All analytics fetched", data: analytics });
});

// user wise analytics
const getAllAnalyticsUserWise = asyncErrorMiddleware(async (req, res) => {
  const analytics = await Analytics.find({
    userId: req.params.userId,
  }).lean();
  if (!analytics)
    return sendError({ res, code: 404, msg: "No analytics found" });

  return sendSuccess({ res, msg: "All analytics fetched", data: analytics });
});

// website wise analytics
const getAllAnalyticsWebsite = asyncErrorMiddleware(async (req, res) => {
  const analytics = await Analytics.aggregate([{
    $lookup : {
      from : "users",
      localField : "userId",
      foreignField : "userId",
      as : "user"
    }
  },{
    $unwind : "$user"
  },{
    $project : {
      "commission" : { $divide : [{ $multiply : ["$adRevenueDollars", "$user.userRevenuePercent"]}, 100] },
      "user" : 1,
      "website" : 1,
      "adRevenueDollars": 1,
      "adImpressions": 1,
      "avgSiteViewingTime": 1,
      "totalClicks": 1,
    }
  },{
    $group : {
      _id : "$website",
      websiteRevenue : { $sum : "$commission" }
    }
  }])

  
  if (!analytics)
    return sendError({ res, code: 404, msg: "No analytics found" });

  return sendSuccess({ res, msg: "All analytics fetched", data: analytics });
});

// website wise analytics
const getAllAnalyticsUserName = asyncErrorMiddleware(async (req, res) => {
  const analytics = await Analytics.aggregate([{
    $lookup : {
      from : "users",
      localField : "userId",
      foreignField : "userId",
      as : "user"
    }
  },{
    $unwind : "$user"
  },{
    $project : {
      "commission" : { $divide : [{ $multiply : ["$adRevenueDollars", "$user.userRevenuePercent"]}, 100] },
      "user" : 1,
      "website" : 1,
      "adRevenueDollars": 1,
      "adImpressions": 1,
      "avgSiteViewingTime": 1,
      "totalClicks": 1,
    }
  },{
    $group : {
      _id : "$user.userName",
      websiteRevenue : { $sum : "$commission" }
    }
  }])

  
  if (!analytics)
    return sendError({ res, code: 404, msg: "No analytics found" });

  return sendSuccess({ res, msg: "All analytics fetched", data: analytics });
});

// website wise analytics
const getAllAnalyticsUserCompany = asyncErrorMiddleware(async (req, res) => {
  const analytics = await Analytics.aggregate([{
    $lookup : {
      from : "users",
      localField : "userId",
      foreignField : "userId",
      as : "user"
    }
  },{
    $unwind : "$user"
  },{
    $project : {
      "commission" : { $divide : [{ $multiply : ["$adRevenueDollars", "$user.userRevenuePercent"]}, 100] },
      "user" : 1,
      "website" : 1,
      "adRevenueDollars": 1,
      "adImpressions": 1,
      "avgSiteViewingTime": 1,
      "totalClicks": 1,
    }
  },{
    $group : {
      _id : "$user.userCompany",
      websiteRevenue : { $sum : "$commission" }
    }
  }])

  
  if (!analytics)
    return sendError({ res, code: 404, msg: "No analytics found" });

  return sendSuccess({ res, msg: "All analytics fetched", data: analytics });
});

const deleteAnalytics = asyncErrorMiddleware(async (req, res) => {
  const analytic = await Analytics.deleteOne({ _id: req.params._id });
  if (!analytic)
    return sendError({ res, code: 404, msg: "No analytics found" });

  return sendSuccess({
    res,
    data: user,
    msg: "Analytics deleted successfully",
  });
});

module.exports = {
  createAnalytics,
  updateAnalytics,
  getAllAnalytics,
  getAllAnalyticsUserWise,
  getAllAnalyticsWebsite,
  getAllAnalyticsUserName,
  getAllAnalyticsUserCompany,
  deleteAnalytics,
};
