//to get longitude and latitude
let fahrenEl = document.querySelector(".temperature-degree");
let descriptionEl = document.querySelector('.temperature-description');
let iconEl = document.querySelector(".weather-icon");
let degreeSecEl = document.querySelector(".degree-section");
let unitEl = document.querySelector('.unit');
let timezoneEl = document.querySelector(".location-timezone");
let cityEl = document.querySelector(".city-name");

window.addEventListener('load', ()=>{
    var long ;
    var lat ;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            let myKey = '32ba732aef9882112195174c42b27a46';
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${myKey}`; 
            fetch(url)
            .then(returnedData=>{
                return returnedData.json();
            })
            .then(returnedData=>{
                let weatherDescription = returnedData.weather[0].description;
                //setting DOM Elements from API
                let celsius = Math.round((returnedData.main.temp) - 273.15);
                fahrenEl.innerHTML = celsius;
                unitEl.innerHTML =  "C";
                descriptionEl.innerHTML = weatherDescription;
                let iconId = returnedData.weather[0].icon;
                iconEl.setAttribute("src",`http://openweathermap.org/img/wn/${iconId}@2x.png`);
                timezoneEl.innerHTML = returnedData.sys.country;  
                console.log(returnedData.sys.country);

                degreeSecEl.addEventListener('click',()=>{
                    if(unitEl.innerHTML === "C"){
                        let Fahrenheit =  Math.round(1.8*(returnedData.main.temp-273) + 32);
                        fahrenEl.innerHTML = Fahrenheit;
                        unitEl.innerHTML= "F";

                    }else{
                        unitEl.innerHTML = "C";
                        fahrenEl.innerHTML = celsius;
                    }
                })
            })
            let theKey = '85648de2a22ebffa83f7b1ae06a1201e'
            let cityAPIUrl = `http://api.positionstack.com/v1/reverse?access_key=${theKey}&query=${lat},${long}`;
            fetch(cityAPIUrl).then(cityDataResponse=>{
                return cityDataResponse.json();
            }).then(cityData=>{
                cityEl.innerHTML = cityData.data[0].county;
            })
        });
    } 
});

