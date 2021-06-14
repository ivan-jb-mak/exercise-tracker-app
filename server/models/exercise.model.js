const mongoose = require("mongoose");

//new schema
const Schema = mongoose.Schema;

//new mongoose schema for exercise
const exerciseSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

//exporting module
module.exports = Exercise;
