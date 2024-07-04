const mongoose = require("mongoose");

const jobCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [
      40,
      "A job category must have less or equal than 40 characters",
    ],
    minlength: [3, "A job category must have more or equal than 3 characters"],
  },
  logo: {
    type: String,
    trim: true,
    maxlength: [
      500,
      "A job category must have less or equal than 500 characters",
    ],
  },
});

const JobCategory = mongoose.model("JobCategory", jobCategorySchema);

module.exports = JobCategory;
