/* Global Variables */

const owKey = "a80041731fd607ec371c762566772248";
const owURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const owCountry = ",US";
const appid = "&appid="
const genBttn = document.getElementById("generate");


let zip = "";
let feelings = "";
let owAPI = "";
let myWeather = "";
let newDate = "";

//get the weather

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

  getDate();
  getWeather()
  .then(() => {
     postData('/add', {newDate, feelings, myWeather});
  })
  //.then(())
  
    
  
});

const getWeather = async () => {
  const request = await fetch(owAPI);
  try {
    const data = await request.json();
    myWeather = Math.floor(data.main.temp.toFixed(0) * 9/5 - 459.67);
    console.log(myWeather);
    return data;
    
  }catch(error){
    console.log("uh oh....error", error);
  }
};



//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}

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

const postData = async ( url = '', data = {}) => {
    console.log(data)
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      // console.log(newData);
      return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
};