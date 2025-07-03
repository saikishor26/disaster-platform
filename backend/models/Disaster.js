const mongoose = require("mongoose");

const disasterSchema = new mongoose.Schema({
  title: String,
  location_name: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  description: String,
  tags: [String],
  owner_id: String,
  created_at: { type: Date, default: Date.now },
  audit_trail: [
    {
      action: String,
      user_id: String,
      timestamp: Date,
    },
  ],
});

disasterSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Disaster", disasterSchema);
