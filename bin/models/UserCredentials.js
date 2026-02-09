const { Schema, model, Types } = require("mongoose");

const loginSchema = new Schema({
  // auto-generated unique user ID
  user_id: {
    type: String,
    unique: true,
    default: () => new Types.ObjectId().toString(),
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

const Login = model("Login", loginSchema);

module.exports = Login;