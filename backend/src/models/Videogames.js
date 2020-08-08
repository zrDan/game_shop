const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const videogameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      maxlength: 30,
    },
    description: {
      type: String,
      trim: true,
      require: true,
      maxlength: 700,
    },
    price: {
      type: Number,
      trim: true,
      require: true,
      maxlength: 10,
    },
    console: {
      type: ObjectId,
      ref: "Console",
      require: true,
    },
    quantity: {
      type: Number,
    },
    cover: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Videogame", videogameSchema);
