// Import Express
// npm i express
const express = require('express');

// Initialize the app
const app = express();

app.use(express.json()); // Middleware to parse JSON body

// Define a port
<<<<<<< Updated upstream
const PORT = 3000

app.get("/pokemon", (req, res) => {
    console.log("pokemon hit")
    res.json({msg: "pokemon hit"})
})
app.get("/", (req, res) => {
    console.log("/ endpoint  hit")
})
=======
const PORT = 3000;

// Define a simple route
app.get('/', (req, res) => {  //req, res cycle
    console.log("GET route hit / - ")
    res.send('From Get req on Server!');  //response
});

app.get('/items', (req, res) => {
    res.send('Welcome to the API!');
});
>>>>>>> Stashed changes

// Start the server
app.listen(PORT, () => {   
     console.log(`Server is running on http://localhost:${PORT}`);
     });





