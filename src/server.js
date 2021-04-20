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
const { Board, Task, User } = require("../db/models");
const { sequelize, DataTypes, Model } = require("../db/db");
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
  const board = await Board.findByPk(req.params.id);
  const tasks = await board.getTasks();

  res.render("board", { board, tasks });
});
app.get("/board/:id", async (req, res) => {
  const board = await Board.findByPk(req.params.id);
  const tasks = await board.getTasks({
    attributes: ["status", "name"],
    nest: true,
  });
  console.log(tasks);
  res.render("board", { board, tasks });
});

//creating a new routes - task
app.get("/task", async (req, res) => {
  res.render("task");
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
