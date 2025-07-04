const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  disaster_id: { type: mongoose.Schema.Types.ObjectId, ref: "Disaster" },
  user_id: String,
  content: String,
  image_url: String,
  verification_status: {
    type: String,
    enum: ["pending", "verified", "fake"],
    default: "pending",
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Report", reportSchema);
