/* eslint-disable no-undef */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Article = require("../models/article");
const Comment = require("../models/comment");

dotenv.config({ path: "../.env" });

mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((e) => console.log(e));

let articles = [];

// inject article
for (let i = 0; i < 50; i++) {
  articles.push({
    title: `title ${i}`,
    content: `content ${i}`,
  });
}

// let comments;

// // inject comments
// for (let i = 0; i < 100; i++) {
//   const element = array[i];
// }

const seedDB = async () => {
  await Article.deleteMany({});
  await Comment.deleteMany({});
  const articleSeeded = await Article.insertMany(articles);

  for (let i = 0; i < articleSeeded.length; i++) {
    const commentCount = Math.floor(Math.random() * 5);
    for (let j = 0; j < commentCount; j++) {
      const article = await Article.findOne({ _id: articleSeeded[i]._id });
      const comment = new Comment({
        article: article._id,
        name: `name ${j}`,
        comment: `comment ${j}`,
      });

      const savedComment = await comment.save();

      article.comments.push(savedComment);
      article.save();
    }
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
