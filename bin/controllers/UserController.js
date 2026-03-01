const UserCredentials = require("../models/UserCredentials");
const bcrypt = require("bcrypt");

const createUserCredentials = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Check if email exists
    const existingUser = await UserCredentials.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Save user
    const userCredentials = new UserCredentials({ name, email, passwordHash });
    await userCredentials.save();

    console.log("Signup:", { name, email, user_id: userCredentials.user_id });

    return res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ( !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Check if email exists
    const existingUser = await UserCredentials.findOne({ email });
    // If no user found, authentication fails
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, existingUser.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("Sign in:", { email, user_id: existingUser.user_id });

    return res.status(200).json({ message: "User authenticated", user_id: existingUser.user_id, name: existingUser.name });
  } catch (error) {
    console.error("Sign in error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createUserCredentials, loginUser };