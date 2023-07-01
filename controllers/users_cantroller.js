const User = require('../models/user');
const Student = require('../models/student');
const Interview = require('../models/interview');

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      Student.find({}, function (err, students) {
        Interview.find({}, function (err, interviewfetch) {
          if (err) {
            console.log("cannot fetch interview", err);
          }
          console.log('interviewfetch', interviewfetch);
          return res.render("user_profile", {
            title: "User Profile",
            user: user,
            students: students,
            interviews: interviewfetch,
          });
        });
      });
    });
  } else {
    console.log("entered Headers");
    return res.redirect("/users/sign-in");
  }
};

module.exports.signUp = function (req, res) {
  if (!req.cookies.user) {
    return res.render("user_sign_up", {
      title: "Placement Cell | Sign Up",
    });
  } else {
    return res.redirect("/users/profile");
  }
};

module.exports.signIn = function (req, res) {
  if (!req.cookies.user_id) {
    return res.render("user_sign_in", {
      title: "Placement Cell | Sign In",
    });
  } else {
    return res.redirect("/users/profile");
  }
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
        function (err, user) {
          if (err) {
            console.log("Error in finding user in signing up");
            return;
          }
          return res.redirect("/users/sign-in");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in signing in");
      return;
    }
    if (user) {
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.signOut = function (req, res) {
  res.clearCookie('user_id');
  return res.redirect("/users/sign-in");
};

module.exports.resetPassword = function (req, res) {
  return res.render('user_reset_password', {
    title: 'Placement Cell | Reset Password',
  });
};

module.exports.resetUserPassword = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Unable to find the said email");
      return res.redirect("back");
    }
    if (user) {
      User.updateOne(
        { email: req.body.email },
        {
          $password: req.body.password,
        }
      );
      user.password = req.body.password;
      user.save();
      console.log("password changed");
      return res.redirect("/users/profile");
    } else {
      console.log("password not changed as user could not be found");
      return res.redirect("back");
    }
  });
};
