//bf119c74c3c879de6c229ce27510de84
//apiKey += eee2c7e90565ccc72ed33f1160353f32
 //get element
 var forecast = $("#forecast");
 var currDate;
 var currentLoc;
 function getCurrentWeather(){
   var city = $(this).attr("data-name");
   var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=eee2c7e90565ccc72ed33f1160353f32";
  
   $.ajax({
    url: queryURL,
    method:"GET"
    }).then(function(response){
     //using bootstrap for creating card
     var currCard= $("<div>").attr("class", "card bg-light");
     forecast.append(currCard);

     var herader =$("<div>").attr("class", "card-header").text("Current Weather for " + response.name);
     currCard.append(herader);
    
    var tRow = $("<div>").attr("class", "row no-gutters");
    currCard.append(tRow);

    //iCon
    var iconUrl = "http://openweathermap.org/img/wn/" +response.weather[0].icon + "09d@2x.png"
    var imgDiv =$("<div>").attr("class", "col-md-4").append($("<img>").attr("src", iconUrl).attr("class", "card-img"));
    tRow.append(imgDiv);

    var textDiv = $("<div>").attr("col-md-8");
    var cardBody=$("<div>").attr("class", "card-body");
    textDiv.append(cardBody);

    //display city name
    cardBody.append($("<h3>").attr("class", "card-title").text(response.name));
  
    //date formate from goolge 
    currDate = moment(response.dt, "X").format("dddd, MMMM Do YYYY, h:mm a");
    cardBody.append($("<p>").attr("class", "card-text").append($("<small>").attr("class", "text-muted").text("Last updated: " + currDate)));
    // Temperature
    cardBody.append($("<p>").attr("class", "card-text").html("Temperature: " + response.main.temp + " &#8457;"));
    // Humidity
    cardBody.append($("<p>").attr("class", "card-text").text("Humidity: " + response.main.humidity + "%"));
    // Wind Speed
    cardBody.append($("<p>").attr("class", "card-text").text("Wind Speed: " + response.wind.speed + " MPH"));

    

   });

 }
 //getCurrentWeather();

 function currentLoc(){
    currentLoc = "NewYork"
    getCurrentWeather(currentLoc);
 }
 function clear() {
  //clear all the weather
  $("#forecast").empty();
}


 //click event 
 $("#searchBtn").on("click", function(e){
   e.preventDefault();

   //input value
   var location = $("#searchInput").val().trim();

   if(location!==""){
     clear();
     currentLoc =location;
     $("#searchInput").val("");
     getCurrentWeather();


   }
 });