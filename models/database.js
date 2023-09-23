const dbConfig = require("./config");

const Sequeliz = require("sequelize");
const Sequelize = new Sequeliz(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  operationsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.Sequelize = Sequelize;

db.active_students = require("./active_students")(
  Sequelize,
  Sequeliz.DataTypes
);
db.coins = require("./coins")(Sequelize, Sequeliz.DataTypes);
db.det_course = require("./det_course")(Sequelize, Sequeliz.DataTypes);
db.t_register = require("./t_register")(Sequelize, Sequeliz.DataTypes);
db.s_register = require("./s_register")(Sequelize, Sequeliz.DataTypes);

db.Sequelize.sync({ force: false, alter: true }).then(() => {
  console.log("database connected 😀 ");
});
module.exports = db;
