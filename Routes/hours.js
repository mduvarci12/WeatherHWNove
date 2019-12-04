const express = require("express");
const router = express.Router();
const { postCity, getCity, removeCity } = require("../Controller/HoursController");

router.post("/", postCity);
router.get('/', getCity);
router.delete('/',removeCity);

module.exports = router;