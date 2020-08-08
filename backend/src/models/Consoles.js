const mongoose = require("mongoose");

const consoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      maxlength: 20,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Console", consoleSchema);
