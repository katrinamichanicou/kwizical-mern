const User = require("../models/user");

const create = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;

  let user = await User.findOne({ email: email });
  if (user) {
    console.log("User already exists, id:", user._id.toString());
    res.status(201).json({ message: "OK" });
  } else {
    const user = new User({ email, name, imageUrl });
    user
      .save()
      .then((user) => {
        console.log("User created, id:", user._id.toString());
        res.status(201).json({ message: "OK" });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: "Something went wrong" });
      });
  }
};

const UsersController = {
  create: create,
};

module.exports = UsersController;
