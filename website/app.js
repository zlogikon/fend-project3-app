/* Global Variables */

const owKey = "&units=imperial";
const owURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const owCountry = ",US";
const appid = "&appid="
const genBttn = document.getElementById("generate");

let zip = "";
let feelings = "";
let owAPI = "";
let myWeather = "";
let newDate = "";

// Generate data and execute asynchronous scripts

genBttn.addEventListener("click", function() {
  feelings = document.getElementById('feelings').value;
  zip = document.getElementById('zip').value;
  owAPI = owURL+zip+owCountry+appid+owKey;
    
  //for testing
  
  console.log(zip);
  console.log(feelings);
  //document.getElementById("date").innerHTML = "Date: " + newDate;
  //document.getElementById("temp").innerHTML = "Weather: " + myWeather + " &#8457;";
  //document.getElementById("content").innerHTML = "Journal entry: " + feelings;

  getDate()
  getWeather()
  .then(() => {
    //console.log(data)
    postData('/add', {newDate, feelings, myWeather});
  })
  .then(() => {
    updateUI()
  })
  
    
  
});

// Get weather from openweather api

const getWeather = async () => {
  const request = await fetch(owAPI);
  try {
    const data = await request.json();
    myWeather = Math.floor(data.main.temp.toFixed(0));
    console.log(myWeather);
    return data;
    
  }catch(error){
    console.log("uh oh....error", error);
  }
};

// Create date

getDate = () =>{
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
  document.getElementById("temp").innerHTML = "Weather: " + allData.myWeather + " &#8457;";
  document.getElementById("content").innerHTML = "Journal entry: " + allData.feelings;
  }catch(error){
    console.log("error", error)
  }
}
