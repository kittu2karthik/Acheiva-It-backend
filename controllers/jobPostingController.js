const JobPosting = require("../models/jobPostingModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

// Existing function
exports.getAllJobPostings = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    JobPosting.find(),
    // .populate("category")
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const jobPostings = await features.query;

  res.status(200).json({
    status: "success",
    results: jobPostings.length,
    data: {
      jobPostings,
    },
  });
});

// New function to get job postings by category
exports.getJobPostingsByCategory = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params;

  const features = new APIFeatures(
    JobPosting.find({ category: categoryId }),
    // .populate("category"),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const jobPostings = await features.query;

  res.status(200).json({
    status: "success",
    results: jobPostings.length,
    data: {
      jobPostings,
    },
  });
});

// Get job posting by ID
exports.getJobPostingById = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const jobPosting = await JobPosting.findById(req.params.id);
  // .populate(
  //   "category"
  // );

  if (!jobPosting) {
    return next(new AppError("No job posting found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      jobPosting,
    },
  });
});

// Create job posting
exports.createJobPosting = catchAsync(async (req, res, next) => {
  try {
    const newJobPosting = await JobPosting.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        jobPosting: newJobPosting,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
    console.error("Error creating job posting:", error.message);
    next(error);
  }
});

// Update job posting
exports.updateJobPosting = catchAsync(async (req, res, next) => {
  const jobPosting = await JobPosting.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!jobPosting) {
    return next(new AppError("No job posting found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      jobPosting,
    },
  });
});

// Delete job posting
exports.deleteJobPosting = catchAsync(async (req, res, next) => {
  const jobPosting = await JobPosting.findByIdAndDelete(req.params.id);

  if (!jobPosting) {
    return next(new AppError("No job posting found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
