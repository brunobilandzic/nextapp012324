import mongoose from "mongoose";

const userObject = {
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
};

module.exports =
  mongoose.models.AppUser ||
  mongoose.model("AppUser", new mongoose.Schema(userObject));
