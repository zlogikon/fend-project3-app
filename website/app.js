/* Global Variables */

const owKey = "a80041731fd607ec371c762566772248";
const owURL = "api.openweathermap.org/data/2.5/weather?zip=";
const owCountry = "US";

let zip = 49441;
//const zip = document.getElementById('zip').value;

let owAPI = owURL+zip+","+owCountry+"&appid="+owKey;




//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const postData = async ( url = '', data = {})=>{
    console.log(data);
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
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

postData('/new', {date: newDate, score: 5});
