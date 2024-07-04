// routes/jobPostingRoutes.js

const express = require("express");
const jobPostingController = require("./../controllers/jobPostingController");

const router = express.Router();

router
  .route("/")
  .get(jobPostingController.getAllJobPostings)
  .post(jobPostingController.createJobPosting);

router
  .route("/:id")
  .get(jobPostingController.getJobPostingById)
  .put(jobPostingController.updateJobPosting)
  .delete(jobPostingController.deleteJobPosting);

router
  .route("/category/:categoryId")
  .get(jobPostingController.getJobPostingsByCategory);

module.exports = router;
