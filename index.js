const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: "*", // Allow all origins
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  exposedHeaders: ["X-Auth-Token"], // Expose custom headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  preflightContinue: false,
  optionsSuccessStatus: 204, // For older browsers
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;

const server =app.listen(PORT,()=>{
  console.log(`Server running on PORT 3001...`.green.bold)
})