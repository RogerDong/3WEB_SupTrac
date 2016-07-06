var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Ticket = require('./ticketSchema.js');
var ticketSchema = Ticket.schema;

var userSchema = Schema({
  username    : { type: String, unique: true },
  password    : String,
  firstName   : String,
  lastName    : String,
  email       : { type: String, unique: true },
  dateOfBirth : { type: Date, default: Date.now },
  roles       : { type: String, enum: ['Developer', 'Reporter'] }

});


userSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    // annoymous function does not always return a value.
    return next();
  });
});

userSchema.statics = {
  findByName: function(_username, callback) {
    return this.findOne({
      username: _username
    }).exec(callback);
  },
  comparePassword:  function(_password, password, callback) {
    bcrypt.compare(_password, password, function(err, res) {
      if (err) {
        callback(err);
      }
      callback(null, res);
    });
  }
};

module.exports = mongoose.model("User", userSchema);
