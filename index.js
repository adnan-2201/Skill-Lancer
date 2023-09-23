const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const db = require("./models/database");
// const multer = require('multer');
const path = require("path");
const { Op } = require("sequelize");

// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); // CommonJS import

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const coins = require("./models/coins");
// const coins = require("./models/coins");

dotenv.config();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/dashboard/tutor"));
app.use(express.static(__dirname + "/dashboard/student"));
app.set("view engine", "ejs");

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/Auth/login.html");
});
app.get("/my_students", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const t_coins = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  const values = await db.active_students.findAll({
    where: {
      t_mobile: mobile,
    },
  });
  var arr = [];
  for (var i = 0; i < Object.keys(values).length; i++) {
    const s_values = await db.s_register.findOne({
      where: {
        mobile: values[i].s_mobile,
      },
    });
    arr.push(s_values);
  }
  // console.log(arr.length);
  // for (var i = 0; i <= arr.length; i++) {
  // console.log(arr.pop());
  // }
  res.render(__dirname + "/dashboard/tutor/active-students", {
    name: details.name,
    coins: t_coins.coin,
    obj: arr,
  });
});
//dashboard begin
app.get("/completed-students", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const t_coins = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  res.render(__dirname + "/dashboard/tutor/completed-students", {
    name: details.name,
    coins: t_coins.coin,
  });
});

app.get("/removed-students", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const t_coins = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  res.render(__dirname + "/dashboard/tutor/removed-students", {
    name: details.name,
    coins: t_coins.coin,
  });
});

app.get("/interested", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const t_coins = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  res.render(__dirname + "/dashboard/tutor/interested", {
    name: details.name,
    coins: t_coins.coin,
  });
});

app.get("/in_enquires", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const t_coins = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  res.render(__dirname + "/dashboard/tutor/in_enquires", {
    name: details.name,
    coins: t_coins.coin,
  });
});

app.get("/my-profile", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const t_coins = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  // console.log(t_coins.coin);
  res.render(__dirname + "/dashboard/tutor/my-profile", {
    coins: t_coins.coin,
    name: details.name,
    mobile: details.mobile,
    email: details.email,
    gender: details.gender,
    about_me: details.about_me,
    dob: details.dob,
    aadhar: details.aadhar,
    institution: details.institution,
    qualification: details.qualification,
    profession: details.profession,
    experience: details.experience,
    doorapart: details.doorapart,
    town: details.town,
    city: details.city,
    state: details.state,
    pincode: details.pincode,
    country: details.country,
  });
});

app.get("/unlocked", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const t_coins = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  res.render(__dirname + "/dashboard/tutor/unlocked", {
    name: details.name,
    coins: t_coins.coin,
  });
});

app.get("/reset-password", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const t_coins = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  res.render(__dirname + "/dashboard/tutor/pages/reset-password", {
    name: details.name,
    coins: t_coins.coin,
  });
});

app.post("/manage_course", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const c_manage = req.body.c_manage;
  const values = await db.det_course.findOne({
    where: {
      c_name: c_manage,
    },
  });
  const t_coins = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  res.render(__dirname + "/dashboard/tutor/pages/manage_courses", {
    name: details.name,
    coins: t_coins.coin,
    values: values,
  });
});

app.get("/addcourse", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const t_coins = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  res.render(__dirname + "/dashboard/tutor/pages/addcourse", {
    name: details.name,
    coins: t_coins.coin,
  });
});

app.get("/view_student", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const t_coins = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  res.render(__dirname + "/dashboard/tutor/pages/view-student", {
    name: details.name,
    coins: t_coins.coin,
  });
});

app.get("/manage-student", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const t_coins = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  res.render(__dirname + "/dashboard/tutor/pages/manage-student", {
    name: details.name,
    coins: t_coins.coin,
  });
});

app.get("/reset-password", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  // const t_coins = await db.coins.findOne({
  //   where: {
  //     mobile: mobile,
  //   },
  // });
  // console.log(t_coins.coin);
  res.render(__dirname + "/dashboard/tutor/pages/reset-password", {
    name: details.name,
    // coins: t_coins.coin,
  });
});

app.get("/my_courses", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const values = await db.det_course.findAll({
    where: {
      mobile: mobile,
    },
  });
  const t_coins = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  // console.log(t_coins.coin);
  res.render(__dirname + "/dashboard/tutor/my-courses", {
    name: details.name,
    coins: t_coins.coin,
    obj: values,
  });
});

app.post("/update_course", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  // console.log(mobile.user);
  const det_course = await db.det_course.update(
    {
      c_name: req.body.coursename,
      c_desc: req.body.coursedec,
      c_cost: req.body.coursecost,
      cost_type: req.body.cost_type,
      field: req.body.field,
      c_lesson: req.body.c_lesson,
      demo: req.body.demo,
    },
    { where: { c_name: req.body.coursename } }
  );
  const values = await db.det_course.findAll({
    where: {
      mobile: mobile,
    },
  });
  const t_coins = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  res.render(__dirname + "/dashboard/tutor/my-courses", {
    name: details.name,
    coins: t_coins.coin,
    obj: values,
  });
});

app.post("/update_profile", async (req, res) => {
  const mobile = req.cookies;
  // console.log(mobile.user);
  const t_register = await db.t_register.update(
    {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      gender: req.body.gender,
      about_me: req.body.about_me,
      dob: req.body.dob,
      aadhar: req.body.aadhar,
    },
    { where: { mobile: mobile.user } }
  );
});

app.post("/unlock", async (req, res) => {
  const mobile = req.cookies.user;
  // console.log(mobile.user);
  const active_students = await db.active_students.create({
    t_mobile: mobile,
    s_mobile: req.body.mobile,
  });
  const val = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  const t_coins = await db.coins.update(
    {
      mobile: mobile,
      coin: val.coin - 5,
    },
    {
      where: {
        mobile: mobile,
      },
    }
  );
  res.render(__dirname + "/dashboard/tutor/pages/unlocked_success", {
    name: mobile.name,
    coins: val.coin - 5,
  });
});

app.get("/unlock_success", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const t_coins = await db.coins.findOne({
    where: {
      mobile: mobile,
    },
  });
  res.render(__dirname + "/dashboard/tutor/pages/unlocked_sucess", {
    name: details.name,
    coins: t_coins.coin,
  });
});

app.post("/update_professional", async (req, res) => {
  const mobile = req.cookies;
  // console.log(req.cookies);
  // console.log(mobile.user);
  const t_register = await db.t_register.update(
    {
      institution: req.body.institution,
      qualification: req.body.qualification,
      profession: req.body.profession,
      experience: req.body.experience,
      doorapart: req.body.doorapart,
      town: req.body.town,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      country: req.body.country,
    },

    { where: { mobile: mobile.user } }
  );

  const details = await db.t_register.findOne({
    where: {
      mobile: mobile.user,
    },
  });
  res.render(__dirname + "/dashboard/tutor/my-profile", {
    name: details.name,
    email: details.email,
    mobile: details.mobile,
    gender: details.gender,
    about_me: details.about_me,
    dob: details.dob,
    aadhar: details.aadhar,
    institution: details.institution,
    qualification: details.qualification,
    profession: details.profession,
    experience: details.experience,
    doorapart: details.doorapart,
    town: details.town,
    city: details.city,
    state: details.state,
    pincode: details.pincode,
    country: details.country,
  });
});
//dashboard end

//interested begin
app.get("/interested", (req, res) => {
  res.render(__dirname + "/dashboard/tutor/interested");
});
//interested end

//enquiry begin
app.get("/in_enquires", (req, res) => {
  res.render(__dirname + "/dashboard/tutor/in_enquires");
});
//enquiry end

//unlocked begin
app.get("/unlocked", (req, res) => {
  res.render(__dirname + "/dashboard/tutor/unlocked");
});
//unlocked end

app.post("/login", async (req, res) => {
  const user = req.body.user;
  const password = req.body.password;
  const details = await db.t_register.findOne({
    where: {
      // password,
      [Op.or]: [{ email: user }, { mobile: user }],
      // console.log(details);
    },
  });

  const c = await db.coins.create({
    mobile: details.mobile,
    coin: 200,
  });
  // console.log(details);

  if (details.password == password) {
    res.cookie("user", details.mobile);
    // const details = await db.t_register.findOne({
    //   where: {
    //     mobile: user,
    //   },
    // });
    const t_coins = await db.coins.findOne({
      where: {
        mobile: details.mobile,
      },
    });
    // console.log(t_coins.coin);
    res.render(__dirname + "/dashboard/tutor/my-profile", {
      name: details.name,
      email: details.email,
      mobile: details.mobile,
      gender: details.gender,
      about_me: details.about_me,
      dob: details.dob,
      aadhar: details.aadhar,
      institution: details.institution,
      qualification: details.qualification,
      profession: details.profession,
      experience: details.experience,
      doorapart: details.doorapart,
      town: details.town,
      city: details.city,
      state: details.state,
      pincode: details.pincode,
      country: details.country,
      coins: t_coins.coin,
    });
  } else {
    // console.log(password, details.password);
    res.sendFile(__dirname + "/Auth/login.html");
  }
});

app.post("/addcourse", async (req, res) => {
  const c_detail = {
    mobile: req.cookies.user,
    c_name: req.body.coursename,
    c_desc: req.body.coursedec,
    c_cost: req.body.coursecost,
    cost_type: req.body.cost_type,
    field: req.body.field,
    c_lesson: req.body.c_lesson,
    demo: req.body.demo,
  };

  const det_course = await db.det_course.create(c_detail);
  const mobile = req.cookies.user;
  const details = await db.t_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const values = await db.det_course.findAll({
    where: {
      mobile: mobile,
    },
  });
  res.render(__dirname + "/dashboard/tutor/my-courses", {
    name: details.name,
    obj: values,
  });
});

app.post("/registration", async (req, res) => {
  const t_detail = {
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    password: req.body.password,
  };

  const t_register = await db.t_register.create(t_detail);
  res.sendFile(__dirname + "/Auth/login.html");
});

// student dashboard

app.get("/s_registration", (req, res) => {
  res.sendFile(__dirname + "/dashboard/student/s_registration.html");
});

app.get("/s_login", (req, res) => {
  res.sendFile(__dirname + "/dashboard/student/s_login.html");
});

app.get("/dashboard", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.s_register.findOne({
    where: {
      mobile: mobile,
    },
  });

  res.render(__dirname + "/dashboard/student/dashboard", {
    sname: details.sname,
  });
});

app.get("/active_courses", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.s_register.findOne({
    where: {
      mobile: mobile,
    },
  });

  res.render(__dirname + "/dashboard/student/active-courses", {
    name: details.name,
  });
});

app.get("/my_profile", async (req, res) => {
  const mobile = req.cookies.user;
  const details = await db.s_register.findOne({
    where: {
      mobile: mobile,
    },
  });

  res.render(__dirname + "/dashboard/student/my-profile", {
    sname: details.sname,
    email: details.email,
    mobile: details.mobile,
    gender: details.gender,
    dob: details.dob,
    status: details.status,
    profession: details.profession,
    interested_topics: details.interested_topics,
  });
});

app.post("/search", async (req, res) => {
  const mobile = req.cookies.user;
  const search = req.body.search;
  const details = await db.s_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const values = await db.det_course.findAll({
    where: {
      c_name: search,
    },
  });
  res.render(__dirname + "/dashboard/student/pages/search", {
    sname: details.sname,
    obj: values,
  });
});

app.post("/show", async (req, res) => {
  const mobile = req.cookies.user;
  const c_name = req.body.course;
  const details = await db.s_register.findOne({
    where: {
      mobile: mobile,
    },
  });
  const values = await db.det_course.findOne({
    where: {
      c_name: c_name,
    },
  });
  res.render(__dirname + "/dashboard/student/pages/course-details", {
    sname: details.sname,
    obj: c_name,
    cost: values.c_cost,
  });
});

app.post("/s_registration", async (req, res) => {
  const s_detail = {
    sname: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    password: req.body.password,
  };
  const s_register = await db.s_register.create(s_detail);
  res.sendFile(__dirname + "/dashboard/student/s_login.html");
});

app.post("/s_login", async (req, res) => {
  const user = req.body.user;
  const password = req.body.password;
  const details = await db.s_register.findOne({
    where: {
      // password,
      [Op.or]: [{ email: user }, { mobile: user }],
      // console.log(details);
    },
  });
  // console.log(details);

  if (details.password == password) {
    res.cookie("user", details.mobile);
    // const details = await db.t_register.findOne({
    //   where: {
    //     mobile: user,
    //   },
    // });

    // console.log(t_coins.coin);
    res.render(__dirname + "/dashboard/student/dashboard", {
      sname: details.sname,
      email: details.email,
      mobile: details.mobile,
      gender: details.gender,
      dob: details.dob,
      status: details.status,
      profession: details.profession,
      interested_topics: details.interested_topics,
    });
  } else {
    // console.log(password, details.password);
    res.sendFile(__dirname + "/dashboard/student/s_login.html");
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Auth/registration.html");
});
