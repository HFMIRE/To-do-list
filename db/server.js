const express = require("express");
const app = express();
const port = 4000;
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const handlebars = expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
const { Board, Task, User } = require("./models");
const { sequelize, DataTypes, Model } = require("./db");

app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");

app.use(express.static("public"));

// connected to the all boards landing page
app.get("/", async (req, res) => {
  const board = await Board.findAll({});
  res.render("allboards", { board });
});

// //conncting 2 page
// app.get("/allboards/:id", async (req, res) => {
//   const board = await Board.findByPk(req.params.id);
//   const task = await Board.findAll({});
//   res.render("board", { board, task });
// });
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
