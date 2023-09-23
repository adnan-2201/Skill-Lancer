module.exports = (sequelize, DataType) => {
  const coins = sequelize.define("coins", {
    mobile: {
      type: DataType.STRING,
    },
    coin: {
      type: DataType.INTEGER,
    },
  });
  return coins;
};
