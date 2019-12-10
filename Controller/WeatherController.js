
function getWeather(req, res) {

       const city = req.body.city;



       const getStatus = async (city) => {
        try {
            return await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f84e01f0e65d72dcab68d6030065f17a`);
        } catch (error) {
          console.error(error)
        }
      }
      

      const Status = async () => {
        const stats = await getStatus(city)
      
        if (stats.data.message) {
          console.log(`Got ${Object.entries(breeds.data.message).length} `)
          res.json({
            status: "success",
            data: stats.data.message
          });
        }
      }
           Status();
 
      res.json({
        status: "success"
      });
}

module.exports = {
  getWeather
};
