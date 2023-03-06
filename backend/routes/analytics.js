//Auth middleware to protect routes
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/is_admin");

const express = require("express");
const router = express.Router();

const {
  createAnalytics,
  updateAnalytics,
  getAllAnalytics,
  getAllAnalyticsUserWise,
  deleteAnalytics,
  getAllAnalyticsWebsite,
  getAllAnalyticsUserName,
  getAllAnalyticsUserCompany
} = require("../controller/analytics");

// Creating new analytics
router.post("/add", createAnalytics);

//Update analytics data (only for admin)
router.put("/update/:_id", [auth, isAdmin], updateAnalytics);

// get all analytics data userwise
router.get("/data/:userId", [auth], getAllAnalyticsUserWise);

// get all analytics data
router.get("/dataAll", [auth], getAllAnalytics);

// get all analytics website wise
router.get("/dataAllWebsites", [auth], getAllAnalyticsWebsite);

// get all analytics user name wise
router.get("/dataAllUsername", [auth], getAllAnalyticsUserName);

// get all analytics user name wise
router.get("/dataAllUserCompany", [auth], getAllAnalyticsUserCompany);

// //get user data (only for admin)
// router.get("/details", [auth, isAdmin], getUserDetails);

//delete analytics data (only for admin)
router.delete("/data/:_id", [auth, isAdmin], deleteAnalytics);



module.exports = router;
