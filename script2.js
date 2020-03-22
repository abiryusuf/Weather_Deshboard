//var weather = "";
//get element 
var locationStore =[];
var forecast = $("#forecast");
var currentLoc;
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var saveData = [];
// Here we are building the URL we need to query the database
//from activity 5, week 6
// var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?" +
//   "q=Bujumbura,Burundi&appid=" + APIKey;
// var city = "city";
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=eee2c7e90565ccc72ed33f1160353f32";
function getCurrent() {
  var queryURL = "https:/api.openweathermap.org/data/2.5/weather?q=" + currentLoc + " &appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    //console.log(response, "Im here!!!!");
    //create new div
    var currCard = $("<div>").attr("class", "card");
    forecast.append(currCard);

    var herader = $("<div>").attr("class", "card-header").text("Current Weather for " + response.name);
    currCard.append(herader);
    var tRow = $("<div>").attr("class", "row no-gutters");
    currCard.append(tRow);
    //iCon
    var iconUrl = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
    var imgDiv = $("<div>").attr("class", "col-md-4").append($("<img>").attr("src", iconUrl).attr("class", "card-img"));
    tRow.append(imgDiv);

    var textDiv = $("<div>").attr("col-md-8");
    currCard.append(textDiv);
    var cardBody = $("<div>").attr("class", "card-body");
    //textDiv.append(cardBody);
    //currCard.append(textDiv);
    currCard.append(cardBody);

    //display city name
    cardBody.append($("<h2>").attr("class", "card-title").text(response.name));
    currCard.append(cardBody);
    //date formate from goolge 
    currDate = moment(response.dt, "X").format(", dddd, MMMM Do YYYY, h:mm a");
    herader.append(currDate);
    cardBody.append($("<p>").append($("<small>").attr("class", "text-muted").text("Last updated: " + currDate)));
    currCard.append(cardBody);
    // Temperature
    cardBody.append($("<p>").html("Temperature: " + response.main.temp));
    // Humidity
    cardBody.append($("<p>").text("Humidity: " + response.main.humidity));
    // Wind Speed
    cardBody.append($("<p>").text("Wind Speed: " + response.wind.speed));
    textDiv.append(cardBody);
    var card = cardBody;
    forecast.append(card);
    tRow.append(textDiv);
    getFiveDayForecast(response.id);
  });
}
 var apiKey = "eee2c7e90565ccc72ed33f1160353f32";
 function getFiveDayForecast(currentLoc) {
  // var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?id=" + city + "&APPID=" + apiKey;
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + currentLoc + "&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response, "Five day forecast!!")
    // debugger
    //create container div
    var newRow = $("<div>").attr("class","forecastFiveDay");
    forecast.append(newRow)
    //console.log(response.list.length);
    //loop through array response to find the forecasts for 15:00
    for (var i = 0; i < response.list.length; i++) {
    //console.log(i);
      //if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
      var newCol = $("<div>").attr("class","fiveDay");
      newRow.append(newCol);
    
      var newCard = $("<div>").attr("class", "card text-white bg-primary");
      newCol.append(newCard);
      var cardHead = $("<div>").attr("class", "card-header").text(moment(response.list[i].dt, "X").format("dddd, MMMM Do YYYY"));
      newCard.append(cardHead);
      var cardImg = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
      newCard.append(cardImg);
      var bodyDiv = $("<div>").attr("class", "card-body");
      newCard.append(bodyDiv);
      bodyDiv.append($("<p>").html("Temp: " + response.main.temp));
  
      console.log(response);
      debugger
      newCard.append(bodyDiv);
      // bodyDiv.append($("<p>").attr("class", "card-text").text("Humidity: " + response.list[i].main.humidity));
      // newCard.append(bodyDiv);
      // newRow.append(newCard);
      forecast.append(newRow)
      //}
    }
  });
}

function localStorage(local){
  if(saveData === null){
    saveData =[local];
  }
  else if(saveData.indexOf(local)=== - 1){
    saveData.push(local);
  }
  //save the new array in local Stroage
  localStorage.setItem("weather", JSON.stringify(saveData));
}

function clear() {
  //clear all the weather
  $("#forecast").empty();
}
$("#searchBtn").on("click", function (e) {
  e.preventDefault();
  //input value
  var location = $("#searchInput").val().trim();
  if (location !== "") {
    clear();
    currentLoc = location;
    // $("#searchInput").val("");
    getCurrent(currentLoc);
    getFiveDayForecast(location);
    //locationStore(currentLoc);
  }
});