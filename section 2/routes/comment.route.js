const CommentController = require("../controllers/comment.controller");

const router = require("express").Router();

router.post("/article/:articleId", CommentController.create);
router.put("/:id", CommentController.update);
router.get("/", CommentController.getList);
router.get("/article/:articleId", CommentController.getListByPost);
router.get("/:id", CommentController.getById);
router.delete("/:id", CommentController.delete);

module.exports = router;
