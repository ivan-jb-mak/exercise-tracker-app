const mongoose = require("mongoose");

//new schema
const Schema = mongoose.Schema;

//new mongoose schema for user
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

//exporting module
module.exports = User;
