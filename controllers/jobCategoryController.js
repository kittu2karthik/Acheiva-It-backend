const JobCategory = require("../models/jobCategory");

exports.createJobCategory = async (req, res) => {
  try {
    const category = new JobCategory(req.body);
    await category.save();
    res.status(201).json({
      status: "success",
      data: category,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getJobCategory = async (req, res) => {
  try {
    const categories = await JobCategory.find();
    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
