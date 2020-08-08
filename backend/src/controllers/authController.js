const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: `Error ${err}`,
      });
    }

    //Reset salt and hash to undefined
    user.salt = undefined;
    user.hashed_password = undefined;

    res.json({ user });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  //Find the user with these email
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    //Authenticate the password with the method authenticate in user Model
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email or Password don't match",
      });
    }

    //Asign token to user id
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    //Asign token to "t" in cookies and set expiration
    res.cookie("t", token, { expire: new Date() + 9999 });

    //Return response with user and token to frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, role } });
  });
};

exports.userDetails = (req, res) => {
  const email = req.body.email;
  User.find(
    { email: email },
    {
      _id: 0,
      role: 0,
      salt: 0,
      hashed_password: 0,
      createdAt: 0,
      updatedAt: 0,
      inventory: 0,
    }
  ).exec((err, data) => {
    if (err) {
      return res.status(404).json({
        error: `Error: ${err}`,
      });
    }

    res.json(data);
  });
};

exports.addItem = (req, res) => {
  console.log(req.body);
  const { email, game, price, id } = req.body;

  User.updateOne(
    { email: email },
    { $push: { inventory: { id: id, game: game, price: price } } },
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Inventory can´t be updated",
        });
      } else {
        console.log(data);
        res.json({ data });
      }
    }
  );
};

exports.removeItem = (req, res) => {
  const { email, id } = req.body;
  // console.log(email, id);
  User.updateOne(
    { email: email },
    { $pull: { inventory: { id: id } } },
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: "The game doesn´t exist or can´t be removed",
        });
      }

      res.json({ data });
    }
  );
};

exports.clearCart = (req, res) => {
  const email = req.params.userMail;

  User.updateOne({ email: email }, { $set: { inventory: [] } }, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: `Error: ${err}`,
      });
    }
    res.json(data);
  });
};

exports.userCart = (req, res) => {
  const email = req.params.userEmail;

  User.find(
    { email: email },
    {
      _id: 0,
      role: 0,
      name: 0,
      email: 0,
      salt: 0,
      hashed_password: 0,
      payment: 0,
      direction: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    },
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      res.json(data);
    }
  );
};
