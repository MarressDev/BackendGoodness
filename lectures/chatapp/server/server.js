const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 3001
// const ToDoModel = require('todo')

app.use(express.json());
app.use(cors());
require('dotenv').config();

const ToDoSchema = mongoose.Schema({
    task: String
})

ToDoModel = mongoose.model("todos", ToDoSchema)
module.exports = ToDoModel

app.get('/get', (req, res) => {


}
)



app.post('/add', (req, res) => {
    const task = req.body.task;
    console.log("Post HIT")
    console.log("Req.body.task:", req.body.task)
    ToDoModel.create({
        task: task
    })
    .then(result => res.json(result))
    .catch(err => res.json(err))
});

app.listen(PORT, () =>  {

    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database")
    })
    .catch(err => console.log(err))

console.log(`Server is running on port ${PORT}`)
})

