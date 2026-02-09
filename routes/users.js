const express = require("express");
const router = express.Router();

// Correct path now that controllers are inside bin
const userCredentialsController = require("../bin/controllers/UserController");

router.post("/", userCredentialsController.createUserCredentials);

router.post("/login", userCredentialsController.loginUser);

module.exports = router;