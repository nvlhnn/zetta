const articleRoute = require("./article.route");
const commentRoute = require("./comment.route");

const router = require("express").Router();

router.use("/articles", articleRoute);
router.use("/comments", commentRoute);

router.use("/api", router);
router.get("/api", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
