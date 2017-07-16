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
     today = new Date();
      var hour = today.getHours();
    

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
           weatherInfo.kelvin = data.main.temp;
           weatherInfo.cel = weatherInfo.kelvin - 273.15;
           weatherInfo.far = (weatherInfo.cel *1.8) + 32;
           console.log(weatherInfo.far);
            $(".far").html(toFar(weatherInfo.far));
            if(data.name !=="Manhattan" && data.name!=="Los Angeles" && data.name !== "Chicago"){
            $("#city").html(data.name);
        }

            
        if((data.name !== "Manhattan" && data.name!=="Los Angeles" && data.name !== "Chicago")){
            changeBG(weatherInfo.status, hour);
        }
        }
    }); 
       }
       function changeBG(weather, hour){

           switch(weather){
                   case("Clouds"):
                            $("body").css("background-image","url(https://tctechcrunch2011.files.wordpress.com/2015/08/clouds.jpg)");
                            break;
                   case("Clear"):
                       if(hour < 19 && hour > 5){
                              $("body").css("background-image","url(http://68.media.tumblr.com/b4c26c6a82aafe7db9601801c5a571f9/tumblr_n8gyqdqA4E1st5lhmo1_1280.jpg)");
                              $(".main-area").css("background-color","rgba(233, 198, 169, 0.5)");
                              //$(".main-area").css("color","#a8bcdb");  
                              break;
                          }else{
                              $("body").css("background-image","url(http://bit.ly/2tsDKkU)");
                              $(".main-area").css("background-color","rgba(173, 100, 40, 0.5)");
                              
                          }
       }
   }
   
          function changeBGNY(hours){
                       if(hours < 19 && hours > 5){
                              $("body").css("background-image","url(https://images.unsplash.com/30/ny-filtered.jpg)");
                              $(".main-area").css("background-color","rgba(47, 45, 44, 0.5)");
                              //$(".main-area").css("color","#a8bcdb");  
                          }else{
                              $("body").css("background-image","url(http://bit.ly/2t3qcgG)");
                              $(".main-area").css("background-color","rgba(47, 45, 44, 0.5)");
                              
                          }
       }
       
                 function changeBGLA(hours){
                       if(hours < 19 && hours > 5){
                              $("body").css("background-image","url(http://bit.ly/2tfBpyB)");
                              $(".main-area").css("background-color","rgba(47, 45, 44, 0.5)");
                              //$(".main-area").css("color","#a8bcdb");  
                          }else{
                              $("body").css("background-image","url(http://eskipaper.com/images/los-angeles-night-1.jpg)");
                              $(".main-area").css("background-color","rgba(148, 98, 71, 0.5)");
                              
                          }
       }
       
                        function changeBGChi(hours){
                       if(hours < 19 && hours > 5){
                              $("body").css("background-image","url(http://bit.ly/2tY8bkQ)");
                              $(".main-area").css("background-color","rgba(47, 45, 44, 0.5)");
                              //$(".main-area").css("color","#a8bcdb");  
                          }else{
                              $("body").css("background-image","url(http://bit.ly/2tfqNzT)");
                              $(".main-area").css("background-color","rgba(247, 181, 106, 0.5)");
                              
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
   $("#NewYork").click(function(){
       var nyLat = 40.785091;
       var nyLong = -73.968285;
       getWeather(nyLong, nyLat);
        $("#city").html("New York City");
        hour = hour + 3;
        console.log(hour);
        changeBGNY(hour);
       
   });
   
      $("#LosAngeles").click(function(){
       var laLat = 34.0522;
       var laLong = -118.2437;
       getWeather(laLong, laLat);
        $("#city").html("Los Angeles");
        console.log(hour);
        changeBGLA(hour);
    });
   
         $("#Chicago").click(function(){
       var chiLat = 41.8781;
       var chiLong = -87.6298;
       getWeather(chiLong, chiLat);
        $("#city").html("Chicago");
        hour = hour + 2;
        console.log(hour);
        changeBGChi(hour);
    });
    
             $("#home").click(function(){
                 getWeather(long, lat);
    });
   

});
