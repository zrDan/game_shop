const formidable = require("formidable"); //Parse an incoming file upload
const fs = require("fs"); //Work with the file system on your computer

const Videogame = require("../models/Videogames");
const Console = require("../models/Consoles");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    const { name, description, price, console, quantity } = fields;
    let videogame = new Videogame(fields);

    if (files.cover) {
      if (files.cover.size > 1000000) {
        res.status(400).json({
          error: "Image should be less than 1MB in size",
        });
      }
      videogame.cover.data = fs.readFileSync(files.cover.path);
      videogame.cover.contentType = files.cover.type;
    }
    videogame.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: `Error ${err}`,
        });
      }
      res.json(result);
    });
  });
};

exports.list = (req, res) => {
  //          if(req.query){ req.query } else { "asc" }
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";

  Videogame.find()
    .select("-photo")
    .populate("console")
    .sort([[sortBy, order]])
    .exec((err, videogames) => {
      if (err) {
        return res.status(400).json({
          error: `Error ${error}`,
        });
      }
      res.json(videogames);
    });
};

exports.listCategory = (req, res) => {
  const consoleId = req.category._id;

  Videogame.find({ console: consoleId }).exec((err, videogames) => {
    if (err) {
      return res.status(400).json({
        error: `Error: ${err}`,
      });
    }
    res.json(videogames);
  });
};

exports.categoryName = (req, res, next, id) => {
  Console.find({ name: id }).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: `Error ${err}`,
      });
    }
    req.category = category[0];
    next();
  });
};

exports.videogameById = (req, res, next, id) => {
  Videogame.findById(id)
    .populate("console")
    .exec((err, videogame) => {
      if (err || !videogame) {
        return res.status(404).json({
          error: "Videogame was not found",
        });
      }
      req.videogame = videogame;
      next();
    });
};

exports.videogameDetails = (req, res) => {
  const id = req.videogame._id;
  Videogame.findById(id)
    .populate("console")
    .exec((err, videogame) => {
      if (err) {
        return res.status(404).json({
          error: "Videogame not found",
        });
      }
      res.json(videogame);
    });
};

exports.cover = (req, res, next) => {
  if (req.videogame.cover.data) {
    res.set("Content-Type", req.videogame.cover.contentType);
    return res.send(req.videogame.cover.data);
  }
  next();
};
