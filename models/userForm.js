const mongoose = require("mongoose");

const userFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    place: {
      type: String,
      required: [true, "Place is required"],
      trim: true,
    },
    fileUpload: {
      type: String,
      required: [true, "File upload is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserForm =
  mongoose.models.UserForm || mongoose.model("UserForm", userFormSchema);

module.exports = UserForm;
