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

const URLBase = 'https://api.meaningcloud.com/sentiment-2.1?key='
const URLLang = '&lang=auto&url='
const TestURL = ''
const apiKey = 11111
const resURL= ''

const port = 5050;

const server = app.listen(port, listening);

function listening(){
  console.log(`Server is running on localhost: ${port}`);
}

app.get('/all', sendUserData)

function sendUserData (req, res) {
  res.send(projectData);
  //console.log(projectData);
};

app.post('/add', addUserData)

function addUserData (req, res) {
    projectData = req.body;
    owAPI = URLBase + apiKey + URLLang + TestURL
    console.log(owAPI)
};
