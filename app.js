const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/users");

const app = express();

/** MongoDB connection */
const mongoDB =
  "mongodb+srv://mansursaad_db_user:tPa6UEiDsl5JcbYk@analytics.oyapxcl.mongodb.net/?appName=AnalyticsDB&retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoDB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

/** Middleware */
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

/** Routes */
app.use("/users", userRoutes);

/** Fallback error handler */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;