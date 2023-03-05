const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env.local" });
const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const connectToDB = require("./utils/conn")

//Using the cors headers to allow only from the request
app.use(cors());
// middleware for post request
app.use(express.json());

//Route handlers
const auth_route = require("./routes/auth");
const user_route = require("./routes/user");
const analytics_route = require("./routes/analytics");

//Routes
app.use("/static", express.static('static'))
app.use("/api/auth", auth_route);
app.use("/api/user", user_route);
app.use("/api/analytics", analytics_route);
app.use(errorMiddleware);

// DB Connection
connectToDB()

//Setting up WebServer
const server = app.listen(process.env.APP_PORT, async () => {
  console.log(`Running on Port ${process.env.APP_PORT}`);
});
