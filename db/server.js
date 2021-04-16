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

app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");

app.use(express.static("public"));

// basic connection
app.get("/", async (req, res) => {
  res.render("board");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
