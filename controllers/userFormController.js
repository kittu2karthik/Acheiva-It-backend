const UserForm = require("../models/userForm");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createUserForm = catchAsync(async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { name, phoneNumber, email, place, description } = req.body;
    const fileUpload = req.file ? req.file.path : null;

    if (!fileUpload) {
      return next(new AppError("File upload is required", 400));
    }

    const newUserForm = await UserForm.create({
      name,
      phoneNumber,
      email,
      place,
      fileUpload,
      description,
    });

    res.status(201).json({
      status: "success",
      data: {
        userForm: newUserForm,
      },
    });
  } catch (error) {
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
