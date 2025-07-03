const express = require("express");
const cors = require("cors");
const disasterRoutes = require("./routes/disasters");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/disasters", disasterRoutes);

app.get("/", (req, res) => {
  res.send("Disaster Response API Running");
});

module.exports = app;
