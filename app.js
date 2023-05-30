const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");
const bodyParser = require("body-parser");
const multer = require("multer");
const authRoutes = require("./routes/auth");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(bodyParser.json());

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use("/auth", authRoutes);

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    "mongodb+srv://samuel:AmWr4frUoWo3wQah@cluster0.5y1nvtp.mongodb.net/messages?retryWrites=true&w=majority"
  )
  .then((res) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
