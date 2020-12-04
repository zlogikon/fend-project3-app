// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();

//Dependencies

const bodyParser = require('body-parser');
const fetch = require('node-fetch')

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

const apiKey = '7f8287a371a07b03325f2da9e55f28ce'
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

async function addUserData (req, res) {
  projectData = req.body.TestURL;
  //const testURL = await projectData.json()
  url = URLBase + apiKey + URLLang + projectData
  const owAPI = await fetch(url)
  console.log(url)


  try {
    const nlpData = await owAPI.json()
    if (nlpData.status.code == 0) {
        //nlpData.message = "Good data received from API"
        res.send(nlpData)
        console.log('API is working')
        console.log(nlpData)
    } else {
        //res.send({ message: "API call didn't work" })
        console.log('API Failed')

    }
  } catch (error) {
    console.error(error)
  }

};
