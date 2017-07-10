$(document).ready(function(){
    
    getLocation();
    var lat;
    var long;

    
    
   function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        
    } else {
        $("#weather").html("Geolocation is not supported by this browser.");
    }
        }

        function showPosition(position) {
        $("#weather").html("Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude);
        long = (position.coords.longitude);
        console.log(long);
        lat = (position.coords.latitude);
        console.log(lat);
        getWeather(long, lat);

    }
       function getWeather(long, lat){ 

           $.ajax({
        
        type: "GET",
        url:"http://api.openweathermap.org/data/2.5/weather?lat=" + lat.toString() + 
                "&lon=" + long.toString() + "&APPID=7bafabe02755edbbbee1b9b6b1d0046c",
        
        success:function(data){
            $("#weatherforecast").html(data.weather[0].description);
        }
    });
       }
});
