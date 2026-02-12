const express = require("express");
const router = express.Router();

// Correct path now that controllers are inside bin
const userCredentialsController = require("../bin/controllers/UserController");

// Signup (create new user)
router.post("/", userCredentialsController.createUserCredentials);

// Login (authenticate existing user)
router.post("/login", userCredentialsController.loginUser);

module.exports = router;