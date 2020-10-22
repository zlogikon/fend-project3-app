// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//Dependencies

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

const port = 5012;

const server = app.listen(port, listening);

function listening(){
  console.log(`Server is running on localhost: ${port}`);
}

// Put something on the page
// Visit http://localhost:(port) in the browser

//myText = "Hello!!!";

//app.get('/new', (req, res) => {
  //res.send(projectData);
  //console.log(projectData);
//});

const data =[];

app.post('/new', addMovie)

function addMovie (req, res) {
    data.push(req.body);
    //console.log(data)
    //console.log("This works")
};
