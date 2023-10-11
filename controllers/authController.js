const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString(),
      location: req.body.location,
    });

    try {
      await newUser.save();
      res.status(201).json({ message: "User successfully created" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `${error.message}` });
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(401).json("Wrong credintail provide a valid email");

      const decryptedpassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET
      );
      const decryptedpass = decryptedpassword.toString(CryptoJS.enc.Utf8);

      decryptedpass !== req.body.password &&
        res.status(401).json("Wrong password");

      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SEC,
        { expiresIn: "7d" }
      );

      const { password, __v, createdAt, updatedAt, ...userData } = user._doc;

      res.status(200).json({ ...userData, token: userToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `${error.message}` });
    }
  },
};
