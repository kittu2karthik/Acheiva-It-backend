const UserForm = require("../models/userForm");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createUserForm = catchAsync(async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);
    // console.log("Uploaded File:", req.file); // Uncommented this line

    const { name, phoneNumber, email, place, description, company } = req.body;
    // const fileUpload = req.file ? req.file.path : null; // Uncommented this line

    // if (!fileUpload) {
    //   return res.status(400).json({ message: "File upload is required" });
    // }

    // Check if a user form with the given email already exists
    const existingUserForm = await UserForm.findOne({ email });
    if (existingUserForm) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user form
    const newUserForm = new UserForm({
      name,
      phoneNumber,
      email,
      place,
      description,
      company,
      // fileUpload, // Added this line
    });
    await newUserForm.save();

    res.status(201).json({
      status: "success",
      data: {
        userForm: newUserForm,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error("Error creating user form:", error);
    next(error);
  }
});

exports.getAllUserForms = catchAsync(async (req, res, next) => {
  const userForms = await UserForm.find();

  res.status(200).json({
    status: "success",
    results: userForms.length,
    data: {
      userForms,
    },
  });
});

exports.getUserForm = catchAsync(async (req, res, next) => {
  const userForm = await UserForm.findById(req.params.id);

  if (!userForm) {
    return next(new AppError("No user form found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      userForm,
    },
  });
});
