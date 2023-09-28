const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/gql', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB!");
});

module.exports = db;
