module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "MySQL321",
  DB: "dbms",
  dialect: "mysql",
  //   dialectOptions: { ssl: true },
  pool: {
    max: 5,
    min: 0,
    acquire: 50000,
    idle: 5432,
  },
};
