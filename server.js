const mongoose = require("mongoose");
const express = require("express");
const app = express();

const articlesRouter = require("./routes/articles");
const Articles = require("./routes/article");

mongoose
  .connect("mongodb://127.0.0.1:27017/blog", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Error", err));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/favicon.ico", express.static("public/assets/favicon.ico"));

app.use("/", articlesRouter);

app.get("/", async (req, res) => {
  //   console.log(req.headers);
  const articles = await Articles.find({});
  res.render("index", { articles: articles });
});

app.listen(7000);
