module.exports = (sequelize, DataType) => {
  const active_students = sequelize.define("active_students", {
    t_mobile: {
      type: DataType.STRING,
    },
    s_mobile: {
      type: DataType.STRING,
    },
  });
  return active_students;
};
