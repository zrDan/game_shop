const Console = require("../models/Consoles");

exports.create = (req, res) => {
  const console = new Console(req.body);
  console.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: `Error ${err}`,
      });
    }
    res.json({ data });
  });
};

exports.list = (req, res) => {
  Console.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: `Error ${err}`,
      });
    }
    res.json({ data });
  });
};

exports.consoleById = (req, res, next, id) => {
  Console.findById(id).exec((err, console) => {
    if (err || !console) {
      return res.status(404).json({
        error: "Console was not found",
      });
    }
    req.console = console;
    next();
  });
};
