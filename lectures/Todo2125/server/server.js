const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();  //no longer need to type express().WHATEVER

app.use(express.json()); // access to req.body
app.use(cors());
require('dotenv').config();

const PORT = 3000;

const Schema = mongoose.Schema;

const ToDoSchema = new Schema(
    {
        todo: String,
        created: Number
    }    
);

const ToDo = mongoose.model("ToDo", ToDoSchema);

app.listen(PORT, () => {
    
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
        console.log("Connected to Database")
        })
        .catch((err) => {
            console.log(err)
        })
    console.log(`Server is running on port ${PORT}`);

});

app.get("/gettodos", (req, res) => {
    console.log("GET HIT")
    ToDo.find()
        .then(found => {
            console.log("found", found)
            res.json(found);
        });
    // res.json({message: "Responding to your request"});
});

app.post("/Create", (req, res) => {
    console.log ("Create Route HIT", req.body);
    ToDo.create(req.body)
    .then(created => {
        console.log("created", created)
        res.json(created)
    })
    .catch(err => {
        console.log(err)
    });
});

app.delete("/delete/:id", (req, res) => {
    console.log("Delete HIT", req.params.id);
    ToDo.findByIdAndDelete(req.params.id)
    .then(deleted => {
        console.log("deleted", deleted)
        res.json(deleted)
    })
})

app.put("/update/:id", (req, res) => {
    console.log("Update HIT", req.params, req.body);
    ToDo.findByIdAndUpdate(req.params.id, req.body, { new: true})
    .then(updated => {
        console.log("updated", updated)
        res.json(updated)
    })
    .catch(err => {
        console.log(err)
    });
})



