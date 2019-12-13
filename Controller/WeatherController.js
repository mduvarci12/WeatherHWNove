const axios = require('axios');
function getWeather(req, res) {

  const city = req.body.city;
  console.log("........", req.params);
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f84e01f0e65d72dcab68d6030065f17a`
    )
    .then(response => {
      console.log("........", response.data);
    //  var jsonData = JSON.stringify(response.data);
    //  console.log("........", jsonData);
      var mResponse = {
        main: response.data.weather[0].main,
        mainDescription: response.data.weather[0].description,
        temp: response.data.main.temp,
        sensTemp: response.data.main.feels_like,
        nem: response.data.main.humidity,
        ruzgar: response.data.wind.speed
      }
      res.json(mResponse);
    })

}

module.exports = {
  getWeather
};
