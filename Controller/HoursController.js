var OneSignal = require('onesignal-node');
const axios = require('axios');
var message;
const {
  hourcity
} = require("../Database/db");
var CronJob = require('node-cron');

function getCity(req, res) {
  hourcity.findAll().then(data => {
    if (data) {
      res.status(200).json(data);
    }
  });
}

async function removeCity(req, res) {
  await hourcity.destroy({
    where: {
      city: req.body.city,
      hour: req.body.hour
    }
  })
    .then(data => {
      res.send({
        status: 'success'
      });
    });
}

function postCity(req, res) {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", req.body);
  var message;
  var itm = req.body;
    axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${itm.city}&units=metric&appid=f84e01f0e65d72dcab68d6030065f17a`
            )
            .then(response => {
              console.log("........", response.data);
              //  var jsonData = JSON.stringify(response.data);
              //  console.log("........", jsonData);
              var mResponse = {
                main: response.data.weather[0].main,
                temp: response.data.main.temp,
                name: response.data.name
              }
              message = mResponse.name + " " + mResponse.temp + " degree " + mResponse.main;
            }).then(() => {

                hourcity
    .create({
      city: itm.city,
      hour: itm.hour,
    })
    .then(myCity => {
      if (myCity) {
        const d = new Date();

        const time = myCity.hour;
        var str = req.body.hour.split(" ");
        console.log(str[0]);
        console.log(str[1]);

        console.log('Before job instantiation');
        CronJob.schedule('' + str[1] + " " + str[0] + ' * * * ', function () {
          const d = new Date();



          // first we need to create a client      
          var myClient = new OneSignal.Client({
            userAuthKey: 'MjA2MWI2MmQtYjE1NC00YWZjLTgxYmMtMTE5NGI4ZTcxYTJh',
            app: {
              appAuthKey: 'MWEzNTE1ZDctNTQxMi00YmRiLThkZjAtYjhjNWE0ZmUxNzUz',
              appId: 'aa180835-ab3e-4cb6-b87a-f6d8228ae249'
            }
          });

        
          // we need to create a notification to send      
          var firstNotification = new OneSignal.Notification({
            contents: {
              en: message,
              tr: "Hava durumu:"
            }
          });

          // set target users      
          firstNotification.postBody["included_segments"] = ["Active Users"];
          firstNotification.postBody["excluded_segments"] = ["Banned Users"];

          // set notification parameters      
          firstNotification.postBody["data"] = {
            "abc": "123",
            "foo": "bar"
          };


          // send this notification to All Users except Inactive ones      
          myClient.sendNotification(firstNotification, function (err, httpResponse, data) {
            if (err) {
              console.log('Something went wrong...');
            } else {
              console.log(data, httpResponse.statusCode);
            }
          });


        });
        console.log('After job instantiation');
        res.json({
          myCity,
          status: "success"
        });



      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        err: "City couldn't add to DB"
      });
    });
            })


}

module.exports = {
  postCity,
  getCity,
  removeCity,
};