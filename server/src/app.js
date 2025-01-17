import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import fileUpload from "express-fileupload";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// defaults middlweares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//     limits: { fileSize: 10 * 1024 * 1024 },
//   })
// );

// importing routes
import GalleryRoutes from "./routes/Gallery.js";
import UserRoutes from "./routes/User.js";
import BookRoutes from "./routes/Book.js";
import OrderRoutes from "./routes/Order.js";
import AdminStatsRoutes from "./routes/admin.stats.js";

// routes declaration
app.use("/gallery", GalleryRoutes);
app.use("/user", UserRoutes);
app.use("/book", BookRoutes);
app.use("/order", OrderRoutes);
app.use("/admin-stats", AdminStatsRoutes);

// / Error handler middleware
app.use(errorHandler);

export default app;
