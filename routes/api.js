var Ticket = require('../schema/ticketSchema.js');
var Comment = require('../schema/commentSchema.js');
var User = require('../schema/userSchema.js');

exports.getTickets = function(req, res) {
  Ticket.find(function(err, tickets) {
    if (err) {
      res.send(err);
    }
    res.json(tickets);
  });
};

exports.getNewTickets = function(req, res) {
  Ticket.find({ status: 'NEW' }, function(err, tickets) {
    if (err) {
      res.send(err);
    }
    res.json(tickets);
  });
};

exports.getTicket = function(req, res) {
  Ticket.findOne({ _id: req.params.ticket_id }, function(err, ticket) {
    res.json(ticket);
  });
};

exports.getUser = function(req, res) {
  User.findOne({ _id: req.params.user_id }, function(err, user) {
    res.json(user);
  });
};

exports.createTicket = function(req, res) {
  var ticket = new Ticket({
    summary: req.body.summay,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status
  });
  ticket.save();
};

exports.createComment = function(req, res) {
  var comment = new Comment({
    content: req.body.content
  });
  comment.save();
};

exports.deleteTicket = function(req, res) {
  var ticketId = req.body.ticket_id;
  Ticket.remove({ _id: ticketId }, function(err, res) {
    res.end('Delete ticket successfuly');
  });
};
