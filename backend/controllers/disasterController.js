const Disaster = require("../models/Disaster");

exports.createDisaster = async (req, res) => {
  try {
    const { title, location_name, description, tags, owner_id } = req.body;
    const disaster = new Disaster({
      title,
      location_name,
      description,
      tags,
      owner_id,
      audit_trail: [
        { action: "create", user_id: owner_id, timestamp: new Date() },
      ],
    });
    await disaster.save();
    res.status(201).json(disaster);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDisasters = async (req, res) => {
  try {
    const tag = req.query.tag;
    const query = tag ? { tags: tag } : {};
    const disasters = await Disaster.find(query);
    res.json(disasters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDisaster = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const disaster = await Disaster.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!disaster) return res.status(404).json({ error: "Not found" });

    disaster.audit_trail.push({
      action: "update",
      user_id: update.owner_id || "unknown",
      timestamp: new Date(),
    });

    await disaster.save();
    res.json(disaster);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDisaster = async (req, res) => {
  try {
    const id = req.params.id;
    const disaster = await Disaster.findByIdAndDelete(id);
    if (!disaster) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
