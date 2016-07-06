var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./userSchema.js');
var Comment = require('./commentSchema.js');
var commentSchema = Comment.schema;

var ticketSchema = new Schema({
  summary      : String,
  description  : String,
  priority     : { type: String, enum: ['TRIVIAL', 'MINOR', 'MAJOR', 'CRITICAL', 'BLOCKER'] },
  status       : { type: String, enum: ['NEW', 'IN PROGRESS', 'DONE'] },
  creationDate : { type: Date, default: Date.now },

  reporter     : { type: Schema.Types.ObjectId, ref: 'User' },
  developer    : { type: Schema.Types.ObjectId, ref: 'User'  },
  comments     : [commentSchema]
});

ticketSchema.statics = {
  findAllTickets: function(callback) {
    return this.find({}).
      exec(callback);
  },
  findTicketById: function(id, callback) {
    return this.findOne({ _id: id }).
      exec(callback);
  }
};

module.exports = mongoose.model("Ticket", ticketSchema);
