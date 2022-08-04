const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./routes/index.route");
const errorHandler = require("./middlewares/errorHandler.middleware");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((e) => console.log(e));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log("conected to port 5000");
});
