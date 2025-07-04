const express = require("express");
const cors = require("cors");
const disasterRoutes = require("./routes/disasters");
const reportRoutes = require("./routes/reports");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/disasters", disasterRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.send("Disaster Response API Running");
});

module.exports = app;
