const axios = require('axios');
function getWeather(req, res) {

  const city = req.body.city;



  

    axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f84e01f0e65d72dcab68d6030065f17a`
    )
    .then(      response => {
      console.log("........", response.data);
     
    })


/*     try {
      return await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f84e01f0e65d72dcab68d6030065f17a`);
    } catch (error) {
      console.error(error)
    }
  }


  try {
    const stats = getStatus(city)

    if (stats) {
      console.log((stats));
      res.json({
        status: "success",
        data: stats
      });
    }
  }
  catch (error) {
    console.error(error)
  } */
}


module.exports = {
  getWeather
};
