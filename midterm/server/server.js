const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');

const app = express();

app.use(express.json());
app.use(cors());
require('dotenv').config();

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
    console.log(`Server is running on port ${PORT}`);
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to Database")        
    })
    .catch((err) => {
        console.log(err)
    })
});

app.get("/gettodos", (req, res) => {
    console.log("Get ToDos HIT")
    ToDo.find()
    .then(found => {
        console.log("found", found)
        res.json(found);        
    })
    .catch(err => {
        console.log(err)
    })
});

app.post("/create", (req, res) => {
    console.log("Create Route HIT")
    ToDo.create(req.body)
    .then(created => {
        console.log("created", created)
        res.json(created)
    })
    .catch(err => {
        console.log(err)
    })
});

app.put("/edit/:id", (req, res) => {
    console.log("Edit Route HIT")
    ToDo.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updated => {
        console.log("updated", updated)
        res.json(updated)
    })
    .catch(err => {
        console.log(err)
    })
});

app.delete("/delete/:id", (req, res) => {
    console.log("Delete Route HIT")
    ToDo.findByIdAndDelete(req.params.id)
    .then(deleted => {
        console.log("deleted", deleted)
        res.json(deleted)        
    })
    .catch(err => {
        console.log(err)
    })
})

