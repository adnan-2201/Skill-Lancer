module.exports = (sequelize, DataType) => {
  const t_register = sequelize.define("t_register", {
    name: {
      type: DataType.STRING,
    },
    email: {
      type: DataType.STRING,
    },
    password: {
      type: DataType.STRING,
    },
    mobile: {
      type: DataType.STRING,
    },
    gender: {
      type: DataType.STRING,
    },
    institution: {
      type: DataType.STRING,
    },
    dob: {
      type: DataType.STRING,
    },
    about_me: {
      type: DataType.STRING,
    },
    aadhar: {
      type: DataType.STRING,
    },
    experience: {
      type: DataType.STRING,
    },
    profession: {
      type: DataType.STRING,
    },
    qualification: {
      type: DataType.STRING,
    },
    doorapart: {
      type: DataType.STRING,
    },
    town: {
      type: DataType.STRING,
    },
    city: {
      type: DataType.STRING,
    },
    country: {
      type: DataType.STRING,
    },
    state: {
      type: DataType.STRING,
    },
    pincode: {
      type: DataType.STRING,
    },
  });
  return t_register;
};
