var OneSignal = require('onesignal-node');
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

function removeCity(req, res) {
  hourcity.destroy({
      where: {
        city: req.body.city,
        hour: req.body.hour
      }
    })
    .on('success', function () {
      res.json({
        status: 'success'
      });
    });
}

function postCity(req, res) {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", req.body);
  var itm = req.body;
  hourcity
    .create({
      city: itm.city,
      hour: itm.hour,
    })
    .then(myCity => {
      if (myCity) {
        console.log("working yet");
        const d = new Date();
        console.log('Midnight:', d);
        const time = myCity.hour;
        var str = req.body.hour.split(" ");
        console.log(str[0]);
        console.log(str[1]);

        console.log('Before job instantiation');
        CronJob.schedule('' + str[1] + " " + str[0] + ' * * * ', function () {
          const d = new Date();
          console.log('Midnight:', d);


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
              en: 'changes',
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
}

module.exports = {
  postCity,
  getCity,
  removeCity,
};