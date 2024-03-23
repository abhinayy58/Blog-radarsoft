const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const path = require("path");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@radar.bvnwvbm.mongodb.net/blog?retryWrites=true&w=majority&appName=rada`, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.urlencoded({ extended: true }));
app.use("/api/blogs", blogRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Server is Ready"));
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
