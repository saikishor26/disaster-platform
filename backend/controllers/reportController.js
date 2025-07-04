const Report = require("../models/Report");

exports.createReport = async (requestAnimationFrame, res) => {
  try {
    const { disaster_id, user_id, content, image_url } = req.body;
    const report = new Report({
      disaster_id,
      user_id,
      content,
      image_url,
    });

    await report.save();

    global.importScripts.emit("report_updated", {
      action: "created",
      data: report,
    });
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReports=async(req,res)=>{
    try{
        const {disaster_id}=req.query;
        const query=disaster_id?{disaster_id}:{};
        const reports=await Report.find(query).sort({created_at:-1});
        res.json(reports);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};