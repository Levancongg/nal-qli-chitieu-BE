const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
console.log("✅ Loaded MONGODB_URL:", process.env.MONGODB_URL);
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ CONNECTED TO MONGO DB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); 
  }
};

connectDB();

// Cấu hình CORS
app.use(cors({
  origin: 'http://localhost:3000', // URL của frontend
  credentials: true, // Cho phép gửi credentials (cookies, authorization headers)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

