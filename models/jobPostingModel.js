const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true,
    maxlength: [40, "A job posting must have less or equal then 40 characters"],
    minlength: [3, "A job posting must have more or equal then 3 characters"],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: [
      5000,
      "A job posting must have less or equal then 5000 characters",
    ],
    minlength: [10, "A job posting must have more or equal then 10 characters"],
  },
  keySkills: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: "At least one key skill is required.",
    },
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value instanceof Date && !isNaN(value);
      },
      message: "Invalid start date.",
    },
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value instanceof Date && !isNaN(value);
      },
      message: "Invalid end date.",
    },
  },
  location: {
    type: String,
    required: true,
    trim: true,
    maxlength: [40, "A job posting must have less or equal then 40 characters"],
    minlength: [3, "A job posting must have more or equal then 3 characters"],
  },
  positionType: {
    type: String,
    required: true,
    enum: {
      values: ["Permanent", "Contract"],
      message: "Difficulty is either: Permanent, Contract",
    },
  },
  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: [40, "A job posting must have less or equal then 40 characters"],
    minlength: [3, "A job posting must have more or equal then 3 characters"],

    // type: mongoose.Schema.Types.ObjectId,
    // ref: "JobCategory",
    // required: true,
  },
});

const JobPosting = mongoose.model("JobPosting", jobPostingSchema);

module.exports = JobPosting;
