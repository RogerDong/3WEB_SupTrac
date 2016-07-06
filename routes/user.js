var User = require('../schema/userSchema.js');

exports.login = function(req, res) {
  var name = req.body.username;
  var password = req.body.password;

  console.log('name is ' + name + ', password is ' + password);

  User.findOne({
    username: name
  }, function(err, user) {
    if (err) {
        console.log(err);
    }
    if (user) {
      User.comparePassword(password, user.password, function(err, isPasswordMatch) {
        if (err) {
          console.log(err);
        }
        if (isPasswordMatch) {
           console.log('Password is correct.');
           res.end('Login successfuly');
        } else {
          console.log('Password is wrong.');
          res.end('Password is wrong');
        }
    });
    } else {
      res.status(404);
    }
});
};

exports.authenticate = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};
