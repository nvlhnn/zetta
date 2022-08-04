const setResponse = require("../helper/response.helper");
const Article = require("../models/article");
const Comment = require("../models/comment");

class ArticleController {
  static create = async (req, res, next) => {
    try {
      const article = new Article(req.body);
      const savedArticle = await article.save();

      delete savedArticle.comments;

      const response = setResponse(true, savedArticle);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  static getList = async (req, res, next) => {
    try {
      //   const articles = await Article.find().populate("comments");
      let offset = 0;
      let limit = 12;

      const aggregation = [
        {
          $lookup: {
            from: "comments",
            localField: "comments",
            foreignField: "_id",
            as: "comments",
          },
        },
      ];

      // search filter
      if (req.query.search) {
        aggregation.push({
          $match: {
            title: {
              $regex: req.query.search,
              $options: "i",
            },
          },
        });
      }

      // sorting
      if (req.query.sort) {
        if (req.query.sort == "oldest") {
          aggregation.push({
            $sort: { createdAt: 1 },
          });
        } else if (req.query.sort == "newest") {
          aggregation.push({
            $sort: { createdAt: -1 },
          });
        }
      }

      // pagination
      if (req.query.page) offset = (req.query.page - 1) * limit;
      aggregation.push({
        $skip: offset,
      });

      aggregation.push({
        $limit: limit,
      });

      const article = await Article.aggregate(aggregation);

      const response = setResponse(true, article);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  static getById = async (req, res, next) => {
    try {
      const article = await Article.findOne({
        _id: req.params.id,
      }).populate({
        path: "comments",
      });

      if (!article) {
        throw {
          status: 404,
          data: null,
        };
      }

      const response = setResponse(true, article);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const article = await Article.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      if (!article) {
        throw {
          status: 404,
          data: null,
        };
      }

      const response = setResponse(true, article);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const deletedArticle = await Article.findByIdAndDelete(req.params.id);

      if (!deletedArticle) {
        throw {
          status: 404,
          data: null,
        };
      }

      await Comment.deleteMany({ article: deletedArticle._id });

      const response = setResponse(true, null);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ArticleController;
