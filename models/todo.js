const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/todo_app`)

const todoSchema = mongoose.Schema({
  task: String,
  detail: String,
});

module.exports = mongoose.model("todo", todoSchema);
