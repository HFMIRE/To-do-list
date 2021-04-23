const express = require("express");
const app = express();
const port = 4000;
const { Op } = require("sequelize");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const handlebars = expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
const { Board, Task, User } = require("../db/models");

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
  const columns = ["To Do", "In Progress", "Done"];
  var board_list = {};
  for (const list of columns) {
    const list_tasks = await Task.findAll({
      where: {
        status: {
          [Op.eq]: list,
        },
        BoardId: {
          [Op.eq]: board.id,
        },
      },
    });

    board_list[list] = list_tasks;
  }
  console.log(board_list);
  res.render("board", { board, board_list });
});

//creating a new routes - task
app.get("/task", async (req, res) => {
  res.render("task");
});

app.post("/taskstatusupdate", async (req, res) => {
  console.log(req.body.id, req.body.status);
  const update_task = await Task.findByPk(req.body.id);
  await update_task.update({ status: req.body.status });
});

app.post("/task", async (req, res) => {
  //    const errors = validationResult(req)
  //    if (!errors.isEmpty()) {
  //        return res.status(400).json({ errors: errors.array() })
  //    }
  console.log(req);
  const task = await Task.create({
    name: req.body.name,
    description: req.body.description,
    status: "To Do",
  });
  const board = await Board.findByPk(req.body.BoardId);
  await board.addTask(task);
  const rurl = "/board/".concat(req.body.BoardId);
  res.redirect(rurl);
});

//creating a new routes - add projects
app.get("/addprojects", async (req, res) => {
  res.render("addprojects");
});

app.post("/allboards", async (req, res) => {
  console.log(req.body.name);
  await Board.create({ name: req.body.name });
  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  res.render("edit", { task });
});

app.get("/task/:id/delete", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  const boardId = task.BoardId;
  task.destroy();
  res.redirect(`/board/${boardId}`);
});

app.get("/board/:id/delete", (req, res) => {
  // sort the board by id, then destroyes the content
  Board.findByPk(req.params.id).then((board) => {
    board.destroy();
    // redirect to another url and show that page
    res.redirect("/");
  });
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
