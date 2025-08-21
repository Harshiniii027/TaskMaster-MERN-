const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userApis = require("./controllers/user");
const taskApis = require("./controllers/task");

require("dotenv").config();
require("./connection/conn");

app.use(express.json());

// CORS for deployed frontend
app.use(cors({
  origin: ["https://taskmaster-mern-client.onrender.com"],
  credentials: true
}));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

// APIs
app.use("/api/v1", userApis);
app.use("/api/v1", taskApis);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
