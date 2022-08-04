const setResponse = require("../helper/response.helper");

function errorHandler(err, req, res, next) {
  const response = setResponse(false, null);
  console.log(err);
  if (err.status) {
    res.status(err.status).json(response);
  } else {
    res.status(500).json(response);
  }
}

module.exports = errorHandler;
