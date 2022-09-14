// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//Set up body-parser as a variable to be used as middle-ware
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
}
//GET route to return projectData
app.get('/all', sendData);
function sendData (req, res){
    res.send(projectData);
};

//Add new data to projectData
app.post('/add', async function(req, res){
    let newData = await req.body;
    projectData = newData;
    res.send(projectData);
    console.log(body);
});