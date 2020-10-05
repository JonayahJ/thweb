// dendencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes");

const Message = require("./messageModel.js");



// setup the port and the express app
const PORT = process.env.PORT || 4000;
const app = express();

app.use(logger("dev"));

// setup the mongodb database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://Jonayah:seMDz^^Kg97B@cluster0.rs5op.mongodb.net/thweb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// middlewares for accepting post requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// routes
app.post("/contact/submit", ({ body }, res) => {
  const message = new Message(body);

  Message.create(message)
    .then(dbMessage => {
      res.json(dbMessage);
    })
    .catch(err => {
      res.json(err);
    });
});


// start the server
app.listen(PORT, () => {
  console.log(`You're being served on port ${PORT}!`);
});
