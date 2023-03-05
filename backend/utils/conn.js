//Mongoose
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_CONN_URL;

const connectToDB = () => {
  let mongoSettings = { useNewUrlParser: true, useUnifiedTopology: true };
  //remove comment when creating index for the first time
  mongoSettings["autoIndex"] = false;

  mongoose.set("strictQuery", true);
  return mongoose
    .connect(MONGO_URL, mongoSettings)
    .then(async () => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(`Error in connecting to database ${err}`);
    });
};

module.exports = connectToDB;
