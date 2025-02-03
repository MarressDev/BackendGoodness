const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());
require("dotenv").config();

const PORT = 3000;
const Schema = mongoose.Schema;

const ToDoSchema = new Schema(
    {
    todo: String,
    created: Number
    }
)

const ToDo = mongoose.model("ToDo", ToDoSchema);

app.listen(PORT, () => {
    mongoose.connect(process.env.MONGO_URI)
})
