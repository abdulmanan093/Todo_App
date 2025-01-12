const express = require("express");
const app = express();
const path = require("path");
const todoModel = require("./models/todo");

//setting up parsers for form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//set up ejs as a view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let todos = await todoModel.find();
  res.render("read", { todos });
});

app.get("/edit/:id", async (req, res) => {
  let todo = await todoModel.findOne({ _id: req.params.id });
  res.render("edit", { todo });
});

app.post("/update/:id", async (req, res) => {
  let { task, detail } = req.body;
  await todoModel.findOneAndUpdate(
    { _id: req.params.id },
    { task, detail },
    { new: true }
  );
  res.redirect("/read");
});

app.get("/delete/:id", async (req, res) => {
  await todoModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.post("/create", async (req, res) => {
  let { task, detail } = req.body;
  await todoModel.create({
    task,
    detail,
  });
  res.redirect("/read");
});

app.listen(3000);
