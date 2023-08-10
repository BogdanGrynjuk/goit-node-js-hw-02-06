const app = require("./app");

// require("dotenv").config();
// console.log(process.env.DB_URI);

// FirbcEKhLKxkkor3;

const mongoose = require("mongoose");

// const DB_URI =
//   "mongodb+srv://BogdanGrynjuk:FirbcEKhLKxkkor3@cluster0.fzazmdh.mongodb.net/db-contacts?retryWrites=true&w=majority";

const DB_URI = process.env.DB_URI;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_URI)
  .then(() =>
    app.listen(3000, () => console.log("Database connection successful"))
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
