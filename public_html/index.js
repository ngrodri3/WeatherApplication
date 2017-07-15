    var weatherInfo = new function(){
        this.main;
        this.kelvin;
         this.status;
         this.type;
         this.far;
         this.cel;
     };

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

        long = (position.coords.longitude);
        lat = (position.coords.latitude);
        getWeather(long, lat);

    }
       function getWeather(long, lat){ 

           $.ajax({
        
        type: "GET",
        url:"http://api.openweathermap.org/data/2.5/weather?lat=" + lat.toString() + 
                "&lon=" + long.toString() + "&APPID=7bafabe02755edbbbee1b9b6b1d0046c",
        
        success:function(data){
            $("#weatherforecast").html(data.weather[0].description);
            weatherInfo.status = data.weather[0].main;
            $("#city").html(data.name);

           weatherInfo.kelvin = data.main.temp;
           weatherInfo.cel = weatherInfo.kelvin - 273.15;
           weatherInfo.far = (weatherInfo.cel *1.8) + 32;
           console.log(weatherInfo.far);
            $(".far").html(toFar(weatherInfo.far));

            changeBG(weatherInfo.status);
        }
    }); 
       }
       function changeBG(weather){
           switch(weather){
                   case("Clouds"):
                            $("body").css("background-image","url(https://tctechcrunch2011.files.wordpress.com/2015/08/clouds.jpg)");
                            break;
                   case("Clear"):
                              $("body").css("background-image","url(http://68.media.tumblr.com/b4c26c6a82aafe7db9601801c5a571f9/tumblr_n8gyqdqA4E1st5lhmo1_1280.jpg)");
                              $(".main-area").css("background-color", "#ffccb3")
                              break;
       }
   }
   function toFar(far){
       $("#temp").html(far.toFixed(2));
       weatherInfo.type = "F";
       $("#tempToggle").css("value", "To Celsuis");
   }
   function toCelcius(cel){
       $("#temp").html(cel.toFixed(2));
       weatherInfo.type = "C";
       $("#fOrC").html(weatherInfo.type);
   }
   
   $("#tempToggle").click(function(){
       
       if(weatherInfo.type == "C"){
           var far = (weatherInfo.far).toFixed(2);
       $("#temp").html(far);
       weatherInfo.type = "F";
       $("#tempType").html(weatherInfo.type);

       }
       else if(weatherInfo.type == "F"){

        var cel = (weatherInfo.cel).toFixed(2);
        $("#temp").html(cel);
       weatherInfo.type = "C";
       $("#tempType").html(weatherInfo.type);

       }
   });

});
