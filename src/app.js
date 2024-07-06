const express = require("express");
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(userRoutes);

app.use(function (req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.write("you posted:\n");
  res.end(JSON.stringify(req.body, null, 2));
});

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Database is connected");
    console.log(`server is listening on http://localhost:${port}`);
  });
};

start();
