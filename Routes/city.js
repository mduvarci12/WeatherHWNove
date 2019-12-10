const express = require("express");
const router = express.Router();
const { getWeather } = require("../Controller/WeatherController");

router.post("/", getWeather);


module.exports = router;