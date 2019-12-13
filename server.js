const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const port = 3000;

const HoursRoute = require('./Routes/hours');
const CityRoute = require('./Routes/city');


app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//Database
const database = require("./Database/db.js");
app.set(database);

app.use('/hours', HoursRoute);
app.use('/city', CityRoute);

app.get('/', (req, res) => {
  res.send({hi: 'hello'});
});

app.listen(port, () => console.log(`App listening on port ${port}!`));