const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const fs = require("fs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  userCompany: {
    type: String,
    required: true,
    trim: true,
  },
  userRevenuePercent: {
    type: Number,
    required: true,
  },
  userStatus: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
    trim: true,
  },
  userEmail: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  userPassword: {
    type: String,
    required: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// auto userId increment
userSchema.plugin(AutoIncrement, { inc_field: "userId" });

// generate auth token
userSchema.methods.generateAuthToken = function () {
  const privateKEY = fs.readFileSync(
    `${__dirname}/../credentials/jwtkeys/private.key`,
    "utf8"
  );

  const signOptions = {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    subject: this.userEmail,
    expiresIn: "7d",
    algorithm: "RS256",
  };
  const token = jwt.sign(
    {
      _id: this._id,
      userId: this.userId,
      userStatus: this.userStatus,
      isAdmin: this.isAdmin,
    },
    privateKEY,
    signOptions
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
