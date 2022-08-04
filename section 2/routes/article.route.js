const ArticleController = require("../controllers/article.controller");

const router = require("express").Router();

router.post("/", ArticleController.create);
router.put("/:id", ArticleController.update);
router.get("/", ArticleController.getList);
router.get("/:id", ArticleController.getById);
router.delete("/:id", ArticleController.delete);

module.exports = router;
