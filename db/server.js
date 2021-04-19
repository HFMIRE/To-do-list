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
const moment = require("moment");

app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connected to the all boards landing page
app.get("/", async (req, res) => {
  const board = await Board.findAll({});
  res.render("allboards", { board });
});

app.get("/board/:id", async (req, res) => {
  const boardId = await Board.findByPk(req.params.id);
  const board = await Board.findAll({
    include: [{ model: Task, as: "tasks" }],
    nest: true,
  });
  res.render("board", { board, boardId });
});

//creating a new routes - addtask
app.get("/addtask", async (req, res) => {
  res.render("addtask");
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
