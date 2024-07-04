const express = require("express");
const multer = require("multer");
const path = require("path");
const userFormController = require("../controllers/userFormController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimeType && extname) {
      return cb(null, true);
    } else {
      cb(new Error("File type not supported"));
    }
  },
});

router
  .route("/")
  .post(
    upload.single("fileUpload"),
    (req, res, next) => {
      console.log("File Upload Middleware:", req.file);
      next();
    },
    (req, res, next) => {
      try {
        userFormController.createUserForm(req, res, next);
      } catch (error) {
        console.error("Error in createUserForm:", error);
        res.status(500).send("Internal Server Error");
      }
    }
  )
  .get(userFormController.getAllUserForms);

router.route("/:id").get(userFormController.getUserForm);

module.exports = router;
