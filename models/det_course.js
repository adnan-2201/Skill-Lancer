module.exports = (sequelize, DataType) => {
  const det_course = sequelize.define("det_course", {
    mobile: {
      type: DataType.STRING,
    },
    c_name: {
      type: DataType.STRING,
    },
    c_desc: {
      type: DataType.STRING,
    },
    field: {
      type: DataType.STRING,
    },
    c_lesson: {
      type: DataType.STRING,
    },
    c_cost: {
      type: DataType.STRING,
    },
    cost_type: {
      type: DataType.STRING,
    },
    demo: {
      type: DataType.STRING,
    },
  });
  return det_course;
};
