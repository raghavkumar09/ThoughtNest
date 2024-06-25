const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Article = require("./models/article");
const methodOverride = require("method-override");
const articleRouter = require("./routes/articles");
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/blog");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
    const articles = await Article.find().sort({ createdAt: "desc" });
    res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));