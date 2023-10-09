const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Use a pre-save hook to hash the password before saving it to the database
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

// Create and export the User model based on the user schema
module.exports = mongoose.model("User", userSchema);
