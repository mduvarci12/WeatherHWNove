var Sequelize = require("sequelize");

module.exports = function(sequelize, Sequelize) {
  return (item = sequelize.define(
    "hourscity",
    {
      city: {
        type: Sequelize.TEXT
      },
      hour: {
        type: Sequelize.TEXT
      },
    },
    { freezeTableName: true }
  ));
};