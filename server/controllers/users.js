const JWT = require("jsonwebtoken");
const User = require("../models/uers");
const { JWT_SECRET } = require("../configuration");

signToken = (user) => {
  return JWT.sign(
    {
      iss: "Const",
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Check if the is a user with the same email
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use" });
    }
    // Create a new user
    const newUser = new User({
      email,
      password,
    });
    newUser.save();
    // Response with token
    // res.json({ user: "created" });
    // Generate the token
    const token = signToken(newUser);
    res.status(200).json({ token });
  },
  signIn: async (req, res, next) => {
    try {
      // Generate token
      const token = signToken(req.user);
      res.status(200).json({ token });
      console.log("Successful login!");
      next();
    } catch (error) {
      next(error);
    }
  },
  secret: async (req, res, next) => {
    try {
      res.json({ sercret: "resource" });
    } catch (error) {
      next(error);
    }
  },
};
