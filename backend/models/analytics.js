const mongoose = require("mongoose");

const analyticsSchema = mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
    required: true,
    trim: true,
  },
  adRevenueDollars: {
    type: Number,
    required: true,
  },
  adImpressions: {
    type: Number,
    required: true,
  },
  avgSiteViewingTime: {
    type: Number,
    required: true,
  },
  totalClicks: {
    type: Number,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

module.exports.Analytics = Analytics;
