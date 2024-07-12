const express = require("express");
const jobCategoryController = require("../controllers/jobCategoryController");
const router = express.Router();

router.post("/", jobCategoryController.createJobCategory);
router.get("/", jobCategoryController.getJobCategory);

module.exports = router;
