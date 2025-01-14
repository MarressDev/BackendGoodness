const express = require('express');
const app = express();
const items = []; //Simple in-memory database
const PORT = 3000;

// Middleware
app.use(express.json());

//Create (POST)
app.post('/items', (req, res) => {
    const item = req.body;
    items.push("New entry");
    items.push(item);
    res.status(201).send('Item created');
});

//Read (Get)
app.get('/items', (req, res) => {
    res.json(items);
    console.log("items", items);
});

// Update (PUT)
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    items[id] = updatedItem;
    res.send('Item updated');
});

// Delete (DELETE)
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    items.splice(id, 1);
    res.send('Item deleted');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
