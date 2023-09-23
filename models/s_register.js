module.exports = (sequelize, DataType) => {
  const s_register = sequelize.define("s_register", {
    sname: {
      type: DataType.STRING,
    },
    email: {
      type: DataType.STRING,
    },
    mobile: {
      type: DataType.STRING,
    },
    password: {
      type: DataType.STRING,
    },
    cur_status: {
      type: DataType.STRING,
    },
    profession: {
      type: DataType.STRING,
    },
    interested_topics: {
      type: DataType.STRING,
    },
    gender: {
      type: DataType.STRING,
    },
    dob: {
      type: DataType.STRING,
    },
  });
  return s_register;
};
