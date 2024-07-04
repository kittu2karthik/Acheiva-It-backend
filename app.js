const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const path = require("path"); // Added path module

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const jobPostingRoutes = require("./routes/jobPostingRoutes");
const jobCategoryRoutes = require("./routes/jobCategoryRoutes");
const userFormRoutes = require("./routes/userFormRoutes");

const app = express();
app.use(cors());

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Uncomment if you need to serve static files
// app.use("/uploads", express.static("uploads"));
// app.use(express.static(path.join(__dirname, "public")));

// 3) ROUTES
app.use("/api/v1/userForms", userFormRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/job-postings", jobPostingRoutes);
app.use("/api/v1/categories", jobCategoryRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
