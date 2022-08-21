const express = require("express");
const Article = require("./article");

const router = express.Router();

router.get("/add", (req, res) => {
  res.render("./articles/new");
});

router.post("/add", async (req, res) => {
  console.log(req.body);
  console.log(req.body.title);
  console.log(req.body.author);

  const article = new Article({
    title: req.body.title,
    body: req.body.body,
    author_name: req.body.author,
  });

  await article.save();
  res.redirect("/");
});

router.get("/:id", (req, res) => {
  console.log("Param Id:", req.params.id);
  Article.findById(req.params.id, (err, docs) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.render("./articles/detail", { article: docs });
    }
  });
});

router.post("/:id", async (req, res) => {
  console.log("POST SUCCESS!");
  console.log("my body is:", req.body);
  if (req.body.title) {
    try {
      await Article.updateOne(
        {
          _id: req.params.id,
        },
        { $set: { title: req.body.title } }
      );
    } catch (e) {
      console.log(e.message);
    }
    return;
  }
  if (req.body.body) {
    try {
      await Article.updateOne(
        {
          _id: req.params.id,
        },
        { $set: { body: req.body.body } }
      );
    } catch (e) {
      console.log(e.message);
    }
    return;
  }
  if (req.body.author) {
    try {
      await Article.updateOne(
        {
          _id: req.params.id,
        },
        { $set: { author_name: req.body.author } }
      );
    } catch (e) {
      console.log(e.message);
    }
    return;
  }
});

module.exports = router;
