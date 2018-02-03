var temperature = document.getElementById("temp-id");

function showLocation() {
    
    function getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                document.getElementById("container").innerHTML = "This browser doessn't support geolocation.";
                }
    }
    
    getPosition();
    
    
    function showPosition(position) {
        
        var xhr = new XMLHttpRequest;
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                var ourData = JSON.parse(xhr.responseText);
                
                temperature.textContent = Math.round(ourData.main.temp);
                
                var location = document.getElementById("location-data-description");
                location.textContent = ourData.name + ", " + ourData.sys.country;
                
                var clouds = document.getElementById("cloud-data-description");
                clouds.textContent = ourData.weather[0].description;
                
                var wind = document.getElementById("current-wind");
                wind.textContent = ourData.wind.speed;
                
                function getVisable() {
                    document.getElementsByClassName("other-data")[0].style.opacity = 1;
                }
                
                setTimeout(getVisable, 300);                
                
                var cTemp = document.getElementsByClassName("main-temp")[0];
                var fTemp = document.getElementsByClassName("second-temp")[0];
                
                cTemp.style.opacity = "1";
                fTemp.style.opacity = "0.2";

                fTemp.addEventListener("click", function() {
                    if (fTemp.style.opacity == "0.2") {
                        fTemp.style.opacity = "1";
                        cTemp.style.opacity = "0.2";
                        temperature.textContent = Math.round(parseInt(temperature.textContent) * 9 / 5 + 32);
                    }
                })                    

                cTemp.addEventListener("click", function() {
                    if (cTemp.style.opacity == "0.2") {
                        cTemp.style.opacity = "1";
                        fTemp.style.opacity = "0.2";
                        temperature.textContent = Math.round((parseInt(temperature.textContent) - 32) * 5 / 9);                       
                    }
                })
            }
        }
        
        xhr.open("GET", "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude, true);
        
        xhr.send();
    }
}

showLocation();


