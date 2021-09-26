const express = require("express");
const bodyParser = require("body-parser");
// const requests = require("requests");
const mongoose = require("mongoose");
const ejs = require("ejs");
const chalk = require("chalk");
const multer = require("multer");
const validator = require("validator");
const path = require("path");
const session = require("express-session");

// Variables

const app = express();

const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, avatar, cb) {
    cb(
      null,
      avatar.fieldname + "-" + Date.now() + path.extname(avatar.originalname)
    );
  },
});

var upload = multer({ storage: storage });

var storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/profile/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload1 = multer({ storage: storage1 });

var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/resources/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload2 = multer({ storage: storage2 });

// Schema

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  profileimg: String,
  number: Number,
  password: String,
  address: String,
  state: String,
  isverified: Boolean,
  isonline: Boolean,
  regdate: {
    type: Date,
    default: Date.now,
  },
});
const postsSchema = new mongoose.Schema({
  uploader: String,
  postimg: String,
  tweet: String,
  location: String,
  phone: Number,
  readycounter: Number,
  reportcounter: Number,
  isverfied: {
    type: Boolean,
    default: false,
  },
});

const resourceSchema = new mongoose.Schema({
  uploader: String,

  rimg: String,
  description: String,
  location: String,
  quantity: Number,
  category: String,
  ravail: Boolean,
  rdate: {
    type: Date,
    default: Date.now,
  },
});

var user = mongoose.model("user", usersSchema); //creating collection
var post = mongoose.model("post", postsSchema); // creating collection
var resource = mongoose.model("resource", resourceSchema); //creating collection

// SET AND USE

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
app.use(
  session({ secret: "AmandeepSingh", saveUninitialized: true, resave: true })
);
mongoose
  .connect("mongodb://localhost:27017/AceCare", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(chalk.black.bgGreen("MongoDB Connected...")))
  .catch((err) => console.log(err));

/*GET ROUTES*/

app.get("/", function (req, res) {
  res.render("index", {
    session: req.session.email,
  });
});
app.get("/about-us", function (req, res) {
  res.render("aboutus", {
    session: req.session.email,
  });
});
app.get("/editprofile", function (req, res) {
  res.render("editprofile", {
    session: req.session.email,
  });
});

app.get("/temp", function (req, res) {
  res.render("temp");
});

app.get("/admin", function (req, res) {
  post.find().then((post) => {
    if (post) {
      res.render("admin", {
        post: post,
        session: req.session.email,
      });
    }
  });
});

app.get("/covidtips", function (req, res) {
  res.render("covidtips", {
    session: req.session.email,
  });
});

app.get("/home", function (req, res) {
  if (req.session.email) {
    var loggedin = req.session.email;
    var post = mongoose.model("post", postsSchema);
    var user = mongoose.model("user", usersSchema);
    post.find({ uploader: { $nin: [loggedin] } }).then((post) => {
      if (post) {
        user.findOne({ email: loggedin }).then((user) => {
          if (user) {
            var post1 = mongoose.model("post", postsSchema);
            post1.find({ uploader: req.session.email }).then((post2) => {
              if (post2) {
                res.render("home", {
                  error: "no data found",
                  post: post,
                  post2: post2,
                  session: loggedin,
                  user: user,
                });
              }
            });
          } else {
            res.redirect("login");
            console.log("Erroe in finding user");
          }
        });
      } else {
        console.log(chalk.red.inverse("error while user was fetching posts"));
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/contactus", function (req, res) {
  res.render("contactus", {
    session: req.session.email,
  });
});

app.get("/login", function (req, res) {
  if (req.session.email) {
    res.redirect("/home");
  } else {
    res.render("login", {
      session: req.session.email,
    });
  }
});

app.get("/find", function (req, res) {
  if (req.session.email) {
    res.render("find", {
      session: req.session.email,
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/signup", function (req, res) {
  res.render("signup", {
    session: req.session.email,
  });
});
app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    console.log(err);
  });
  res.redirect("/login");
});
app.get("*", (req, res) => {
  res.send("404 ERROR");
});

/*POST ROUTES*/

app.post("/upload-post", upload.single("avatar"), function (req, res, next) {
  if (
    validator.isLength(req.body.statee, { min: 1, max: 25 }) &&
    validator.isLength(req.body.descc, { min: 1, max: 250 })
  ) {
    const puploader = req.session.email;
    const ptweet = req.body.descc;
    const pstate = req.body.statee;
    const tempphone = "1212";
    const pphone = validator.isMobilePhone(tempphone);
    console.log(req.body.avatar);

    const p1 = new post({
      uploader: puploader,
      tweet: ptweet,
      postimg: req.file.filename,
      location: pstate,
      phone: tempphone,
      readycounter: 00,
      reportcounter: 00,
    });
    p1.save();
    // res.send("suces");
    res.redirect("/home");
  } else {
    console.log("Description needed");
    res.status(404).send();
  }
});

app.post("/signup", function (req, res) {
  // storing form data in variables
  var userName = req.body.username;
  var userEmail = req.body.email;
  var userLocation = req.body.state;
  var userPassword = req.body.password;
  var userCpassword = req.body.cpassword;
  // saving function for storing user registration details in database
  const saveData = function () {
    user.findOne({ email: userEmail }).then((user) => {
      if (user) {
        res.redirect("/signup");
        console.log(chalk.red.inverse("E-mail already in use"));
        //res.write("E-mail already in use");
      } else {
        var user = mongoose.model("user", usersSchema);
        const u1 = new user({
          name: userName,
          email: userEmail,
          profileimg: null,
          number: null,
          password: userPassword,
          address: null,
          state: userLocation,
          isverified: true,
          isonline: true,
        });
        u1.save();
        res.redirect("/login");
        console.log(chalk.green.inverse("USER REGISTRATION SUCCESFULL"));
      }
    });
  };
  // validation function for validation of form data
  const myvalidation = function () {
    if (validator.isLength(userName, { min: 1, max: 25 })) {
      console.log(chalk.green("name is valid"));
      if (validator.isEmail(userEmail)) {
        userEmail = validator.normalizeEmail(userEmail);
        console.log(chalk.green("email is valid and sanitized"));
        if (validator.isLength(userLocation, { min: 1, max: 25 })) {
          console.log(chalk.green("location valid"));
          if (validator.isStrongPassword(userPassword)) {
            if (userPassword == userCpassword) {
              console.log(chalk.green("password is valid and strong"));
              saveData();
            } else {
              console.log(chalk.red("user password mismatched"));
            }
          } else {
            console.log(
              chalk.red(
                "password must contain minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 "
              )
            );
          }
        } else {
          console.log(
            chalk.red("location too large it must be in 25 characters")
          );
        }
      } else {
        console.log(chalk.red("enter valid email"));
      }
    } else {
      console.log(chalk.red("name is not valid"));
    }
  };
  // checking fields are null or not
  if (userName != "") {
    if (userEmail != "") {
      if (userLocation != "") {
        if (userPassword != "") {
          if (userCpassword != "") {
            if (userPassword == userCpassword) {
              console.log(chalk.yellow.inverse("running validation"));
              myvalidation(); //calling validation function if fields are filled properly
            } else {
              console.log("password doesnt matched");
            }
          } else {
            console.log("confirm your password");
          }
        } else {
          console.log("password required");
        }
      } else {
        console.log("location required");
      }
    } else {
      console.log("email required");
    }
  } else {
    console.log("username required");
  }
});

app.post("/login", function (req, res) {
  const Email = req.body.email;
  const Password = req.body.password;
  console.log(chalk.black.bgYellow(`${Email} tried logging in.`));

  if (Email == "" && Password == "") {
    console.log(chalk.black.bgRed(`${Email} Login failed`));
    res.redirect("/login");
  } else {
    user.findOne({ email: Email, password: Password }).then((user) => {
      if (user) {
        console.log(
          chalk.black.bgGreen(`${user.email} Logged In Successfully`)
        );
        req.session.email = user.email;
        if (req.session.email) {
          res.redirect("/home");
        }
      } else {
        res.redirect("/login");
      }
    });
  }
});

app.post("/edit_profile", function (req, res) {
  var sess = req.session.email;
  var name = req.body.name;
  var number = req.body.number;
  var address = req.body.address;
  var state = req.body.state;
  //console.log(sess);
  var user = mongoose.model("user", usersSchema);
  user.findOne({ email: sess }, (err, user) => {
    if (user) {
      user.name = name;
      user.number = number;
      user.address = address;
      user.state = state; //.......
      user.save(function (err, res) {
        if (err) return console.log(err);
      });
    }
  });
  res.redirect("home");
});

app.post("/change_pass", function (req, res) {
  console.log(req.body);
  var user = mongoose.model("user", usersSchema);
  user.findOne({ email: req.session.email }, (err, user) => {
    if (user) {
      if (user.password == req.body.old) {
        if (req.body.new == req.body.conf) {
          user.password = req.body.new;
          user.save(function (err) {
            if (err) return console.log(err);
          });
        }
      }
    }
  });
  res.redirect("home");
});

app.post("/change_pic", upload1.single("pic_prof"), function (req, res, next) {
  console.log(req.file.filename);
  var user = mongoose.model("user", usersSchema);
  user.findOne({ email: req.session.email }, (err, user) => {
    console.log(user.email);
    if (user) {
      console.log("validated");
      console.log(req.file.filename);
      user.profileimg = req.file.filename;
      user.save(function (err) {
        if (err) return console.log(err);
      });
    }
  });
  res.redirect("home");
});

app.post(
  "/upload-resource",
  upload2.single("rpicu"),
  function (req, res, next) {
    if (
      req.body.rname != "" &&
      req.file.filename != "" &&
      req.body.quantity != "" &&
      req.body.rcat != "" &&
      req.session.email != "" &&
      req.body.description != "" &&
      req.body.rloc != ""
    ) {
      console.log(req.body);
      const r1 = new resource({
        uploader: req.session.email,

        rimg: req.file.filename,
        description: req.body.description,
        location: req.body.rloc,
        quantity: req.body.quantity,
        category: req.body.rcat,
        ravail: true,
      });
      r1.save();
      res.send("ok");
    }
  }
);

app.post("/find", function (req, res) {
  var rloc = req.body.rloc;
  var rcat = req.body.rcat;
  console.log(rloc);
  if (rloc != "" && rcat != "") {
    var resource = mongoose.model("resource", resourceSchema); //creating collection
    resource.find(
      { $and: [{ location: rloc }, { category: rcat }] },
      (err, user) => {
        if (user) {
          res.send(user);
        } else {
          res.send("not found");
        }
      }
    );
  }
});

app.post("/admin", function (req, res) {
  console.log(req.body);
  var post = mongoose.model("post", postsSchema); // creating collection
  post.findOne({ tweet: "asas" }, (err, user) => {
    if (user) {
      console.log(user.isverified);
      user.isverified = true;

      user.save(function (err, res) {
        if (err) return console.log(err);
      });
    }
  });
  res.redirect("/admin");
});
app.post("/iamin", function (req, res) {
  console.log(req.body);
  var post = mongoose.model("post", postsSchema); // creating collection
  post.findOne({ _id: req.body.ready }, (err, user) => {
    if (user) {
      user.readycounter = user.readycounter + 1;

      user.save(function (err, res) {
        if (err) return console.log(err);
      });
    }
  });
  res.send("");
});

/*PORT*/
app.listen(5000, function () {
  console.log("Server started on port 5000");
});
