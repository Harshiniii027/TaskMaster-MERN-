const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Username validation
    if (username.length < 5) {
      return res
        .status(400)
        .json({ error: "Username must have at least 5 characters!" });
    }

    // Password validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must have at least 6 characters!" });
    }

    // Check if username or email already exists
    const checkUsers = await User.findOne({ $or: [{ email }, { username }] });

    if (checkUsers) {
      return res
        .status(400)
        .json({ error: "Username or Email already exists!" });
    } else {
      // Hash the password
      const hashPass = await bcrypt.hash(password, 10);
      
      // Create and save the new user
      const newUser = new User({ username, email, password: hashPass });
      await newUser.save();
      
      return res.status(200).json({ success: "Registration Successful!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Check if user with this email exists
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({ error: "Invalid Credentials!" });
    }

    // Compare password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, checkUser.password);

    if (passwordMatch) {
      // Ensure user data is valid
      if (!checkUser._id || !checkUser.email) {
        return res.status(500).json({ error: "User data is invalid!" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: checkUser._id, email: checkUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );



      // Set the token in a cookie
      res.cookie("taskifyUserToken", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Use "Lax" for local development
      });
      

      return res.status(200).json({ success: "Login Success!" },);
    } else {
      return res.status(400).json({ error: "Invalid Credentials!" });
    }
  } catch (error) {
    console.error("Login Error:", error); // Debugging
    return res.status(500).json({ error: "Internal server error!" });
  }
};

module.exports = { register, login };
