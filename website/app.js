/* Global Variables -- changes */

/*const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.API_KEY*/

const genBttn = document.getElementById("generate");

let owAPI = "";

URLBase = 'https://api.meaningcloud.com/sentiment-2.1?key='
URLLang = '&lang=auto&url='
TestURL = ''

const resURL= ''


// Generate data and execute asynchronous scripts

genBttn.addEventListener("click", function() {
  TestURL = document.getElementById('TestURL').value;

  
  getDate()
  
  .then(() => {
    //console.log(data)
    postData('/add', {newDate, TestURL});
  })
  .then(() => {
    updateUI()
  })
  
    
  
});

// Get weather from openweather api

const analyzeURL = async () => {
  owAPI = URLBase + apiKey + URLLang + TestURL
  const request = await fetch(owAPI);
  try {
    const data = await request.json();
    console.log("Passed");
    console.log(owAPI);

    return data;
    
  }catch(error){
    console.log("uh oh....error", error);
  }
};

// Create date

getDate = async () =>{
  let d = new Date();
  let min = '';
  let hour = '';
  let ampm = '';
  if (d.getHours() > 12){
    hour = d.getHours() - 12;
    ampm = ' PM';
  }else{
    hour = d.getHours();
    ampm = ' AM';
  };
  if (d.getMinutes() < 10){
    min = '0';
  }else{
    min = '';
  };
  newDate = d.getMonth()+'/'+ d.getDate()+'/'+ d.getFullYear() + ' | ' + hour + ':' + min + d.getMinutes() + ampm;
};

//Post data to the server

const postData = async ( url = '', data = {}) => {
  //console.log(data)
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),   
  });

  try {
    const newData = await response.json();
    // console.log(newData);
    return newData
  }catch(error) {
  console.log("error", error);
  
  }
};

//Get data from server and update the webpage

const updateUI = async () => {
  const request = await fetch ('/all')
  try{
    const allData = await request.json()
    //console.log(allData);
  document.getElementById("date").innerHTML = "Date: " + allData.newDate;
  document.getElementById("content").innerHTML = "Journal entry: " + allData.TestURL;
  }catch(error){
    console.log("error", error)
  }
}
