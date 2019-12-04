const Sequelize = require("sequelize");
//
const hourcitymodel =require("../Models/hourscitymodel");

const sequelize = new Sequelize(
  "weather",
  "md",
   "5t5t",
  {
    dialect: "mysql",
    host: "127.0.0.1"
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.log("Cannot connected", err);
    throw new Error(err);
  });

sequelize.sync().then(() => {
  console.log("Veritabanina Baglanildi.");
});

const hourcity= hourcitymodel(sequelize,Sequelize);


module.exports = {
    hourcity
};