const axios = require('axios');
function getWeather(req, res) {

  const city = req.body.city;

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f84e01f0e65d72dcab68d6030065f17a`
    )
    .then(response => {
      console.log("........", response.data);

    })

}

module.exports = {
  getWeather
};
