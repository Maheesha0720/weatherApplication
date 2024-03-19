const apiKey = "f53ad20101434261a2750426241203";
const apiUrl = "http://api.weatherapi.com/v1/current.json?";
const search = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");


searchBtn.addEventListener("click",()=>{
   CheckWeather(search.value);
   
 })


//const city=search;
async function CheckWeather(city) {
 // console.log(city);
  const response = await fetch(apiUrl + `key=${apiKey}`+ `&q=${city}`);
  var data = await response.json();

  console.log(data);
//console.log(document.getElementById("search-input").value);



  document.getElementById("location").innerHTML = data.location.name;
  document.getElementById("temp").innerHTML = data.current.temp_c + "°C";
  document.getElementById("temper").innerHTML = data.current.temp_c + "°C";
  document.getElementById("Humidity").innerHTML = data.current.humidity;
  document.getElementById("wind").innerHTML = data.current.wind_kph + "km/h";
  document.getElementById("lon").innerHTML = data.location.lon + "°";
  document.getElementById("lat").innerHTML = data.location.lat + "°";
  document.getElementById("country").innerHTML = data.location.country;
  document.getElementById("feel").innerHTML = data.current.feelslike_c + "°C";
  document.getElementById("cond").innerHTML = data.current.vis_km + "km";
  document.getElementById("loc").innerHTML = data.location.name;
  document.getElementById("con").innerHTML = data.current.condition.text;
  document.getElementById("condition").innerHTML = data.current.condition.text;
  
  const imgElement = document.createElement('img');
  imgElement.src = data.current.condition.icon;
  imgElement.style.width = '128px';
  imgElement.style.height = '128px';
  imgElement.style.marginTop = '20px';
  const weatherIconDiv = document.getElementById("img");
  weatherIconDiv.innerHTML='';
  weatherIconDiv.appendChild(imgElement);
  
  const lati=data.location.lat;
  const long=data.location.lon;

  initializeMap(lati,long);
}
CheckWeather();


//------------------- set time------------------//


function updateLocalTime() {
  const localTimeElement = document.getElementById("local-time");
  const now = new Date();
  const localTimeString = now.toLocaleTimeString();

  localTimeElement.textContent = `${localTimeString}`;
}

updateLocalTime();

setInterval(updateLocalTime, 1000);


//--------------------set date----------------------------
function updateDate(){
  const date=new Date();

  const year=date.getFullYear();
  const month=date.getMonth()+1;
  const day=date.getDate();

  const cuDate=`${year}-0${month}-${day}`;
document.getElementById("local-date").innerHTML=cuDate;
  
console.log(cuDate);

}
updateDate();


//--------------------last week-----------------------------

async function lastWeek(city) {

  const dates = ["date1", "date2", "date3", "date4", "date5", "date6", "date7"];
  const conditions = ["con1", "con2", "con3", "con4", "con5", "con6", "con7"];
  const image=["ic4","ic5","ic6","ic7","ic8","ic9","ic10"];
     const url = "https://api.weatherapi.com/v1/history.json?";

 
 for (let i = 0; i < 7; i++) {
  const ago = i+1;
  console.log("Days ago:", ago);
  const date = new Date();
  const pastDay = new Date(date);
  pastDay.setDate(date.getDate() - ago);
 // console.log("Past day:", pastDay.toDateString());

  const year = pastDay.getFullYear();
  const month = String(pastDay.getMonth() + 1).padStart(2, '0');
  const day = String(pastDay.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  console.log("Past day:", formattedDate);


     const response = await fetch(url + `key=${apiKey}` + `&q=${city}` + `&dt=${formattedDate}`);
     var dataf = await response.json();

     document.getElementById(dates[i]).innerHTML = dataf.forecast.forecastday[0].date;
     document.getElementById(conditions[i]).innerHTML = dataf.forecast.forecastday[0].day.condition.text + " - " + dataf.forecast.forecastday[0].day.avgtemp_c + "°C";
      const imgElement = document.createElement('img');
      imgElement.src = dataf.forecast.forecastday[0].day.condition.icon;
   
      const weatherIconDiv = document.getElementById(image[i]);
      weatherIconDiv.innerHTML='';

      weatherIconDiv.appendChild(imgElement);
  

   console.log(dataf);
   }


}

 searchBtn.addEventListener("click", () => {
  lastWeek(search.value);
 })

lastWeek();

//----------------------------next 3 days--------------

async function nextDays(city) {

  const dates = ["dt1", "dt2", "dt3"];
  const conditions = ["co1", "co2", "co3"];
  const images=["ic1","ic2","ic3"];

  const apiURL = "https://api.weatherapi.com/v1/forecast.json?";

  for (let i = 0; i < 3; i++) {

   const next = i+1;
  console.log("Days next:", next);
  const date = new Date();
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + next);
 

  const year = nextDay.getFullYear();
  const month = String(nextDay.getMonth() + 1).padStart(2, '0');
  const day = String(nextDay.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
 


    const response = await fetch(apiURL + `key=${apiKey}` + `&q=${city}` + `&dt=${formattedDate}`);
    var datan = await response.json();

    document.getElementById(dates[i]).innerHTML = datan.forecast.forecastday[0].date;
    document.getElementById(conditions[i]).innerHTML = datan.forecast.forecastday[0].day.condition.text + " - " + datan.forecast.forecastday[0].day.avgtemp_c + "°C";
     const imgElement = document.createElement('img');
     imgElement.src = datan.forecast.forecastday[0].day.condition.icon;
   
     const weatherIconDiv = document.getElementById(images[i]);
     weatherIconDiv.innerHTML='';
     weatherIconDiv.appendChild(imgElement);
  
   
    console.log(datan);
  }

}

searchBtn.addEventListener("click", () => {
  nextDays(search.value);
})

nextDays();

//--------------map--------------------//
var map;
function initializeMap(latitude, longitude) {
    if (map) {

        map.remove();
    }
    map = L.map('map').setView([latitude, longitude], 13); // Set initial coordinates and zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var marker = L.marker([latitude, longitude]).addTo(map); // Add a marker at specified coordinates
}

 
