const Report = require('../Models/report');
const User = require('../Models/User')

exports.AddReport = async(req,res) => {
    try {
        const { userId, description, type } = req.body;
    
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
          return res.status(400).json({ message: 'User not found' });
        }
    
        // Create new report
        const report = new Report({
          user: user._id,
          description,
          type
        });
        await report.save();
    
        res.status(201).json({ message: 'Report submitted successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}



exports.getReport = async(req,res) => {
    try {
        const reports = await Report.find().populate('user', 'name email');
        res.status(200).json(reports);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}

exports.getByID = async(req,res) => {
    try {
        const report = await Report.findById(req.params.id).populate('user', 'name email');
        if (!report) {
          return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}


exports.updateReport = async(req,res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
          return res.status(404).json({ message: 'Report not found' });
        }
        report.status = req.body.status;
        await report.save();
        res.status(200).json({ message: 'Report updated successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}


exports.DeleteRouter = async(req,res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
          return res.status(404).json({ message: 'Report not found' });
        }
        await report.remove();
        res.status(200).json({ message: 'Report deleted successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}