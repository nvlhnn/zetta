const setResponse = require("../helper/response.helper");
const Comment = require("../models/comment");
const Article = require("../models/article");

class CommentController {
  static create = async (req, res, next) => {
    try {
      // const session = await mongoose.startSession();
      const article = await Article.findOne({ _id: req.params.articleId });

      if (!article) {
        throw {
          data: null,
          status: 400,
        };
      }

      const comment = new Comment({
        article: req.params.articleId,
        ...req.body,
      });
      const savedComment = await comment.save();

      article.comments.push(savedComment);
      article.save();

      const response = setResponse(true, savedComment);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  static getList = async (req, res, next) => {
    try {
      const comments = await Comment.find();

      const response = setResponse(true, comments);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  static getListByPost = async (req, res, next) => {
    try {
      const article = await Article.findOne({
        _id: req.params.articleId,
      }).populate("comments");

      if (!article) {
        throw {
          status: 404,
          data: null,
        };
      }

      const respose = setResponse(true, article.comments);
      res.status(200).json(respose);
    } catch (error) {
      next(error);
    }
  };

  static getById = async (req, res, next) => {
    try {
      const comment = await Comment.findOne({
        _id: req.params.id,
      }).populate("article");

      if (!comment) {
        throw {
          status: 404,
          data: null,
        };
      }

      const response = setResponse(true, comment);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      if (!comment) {
        throw {
          status: 404,
          data: null,
        };
      }

      const response = setResponse(true, comment);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      await Comment.findByIdAndDelete(req.params.id);

      const response = setResponse(true, null);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CommentController;
