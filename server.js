var express = require('express');
var app = express();
//var session = require('express-session');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var User = require('./schema/userSchema.js');
var Ticket = require('./schema/ticketSchema.js');
var Comment = require('./schema/commentSchema.js');

mongoose.connect('mongodb://localhost/suptrac', function(err) {
  if (err) throw err;
  console.log('Successfully connected to MongoDB');
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db.once, you can use mongodb now.');
});

var reporter = new User({
  username: 'reporter_user',
  password: 'Supinf0',
  firstName: 'rep_firstname',
  lastName: 'rep_lastname',
  email: 'reporter@supinfo.com'
});

var developer = new User({
  username: 'developer_user',
  password: 'Supinf0',
  firstName: 'dev_firstname',
  lastName: 'dev_lastname',
  email: 'developer@supinfo.com'
});

var commentUser = new User({
  username: 'comment_user',
  password: 'Supinf0',
  firstName: 'com_firstname',
  lastName: 'com_lastname',
  email: 'comment_user@supinfo.com'
});



var coms = new Comment({
  content: 'Ok, fine. hope to get enough scores.',
  postedBy: commentUser._id
});


var ticket = new Ticket({
  summary: 'some summary about this node js project',
  description: 'so many exam and soe during this week, tired.',
  priority: 'MINOR',
  reporter: reporter._id,
  status: 'NEW',
  comments: coms
});

// reporter.save();
// developer.save();
// commentUser.save();
coms.save();
ticket.save();

// view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// app.use('/views', express.static(__dirname + '/views'));
//app.use(express.session());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('index', { title: 'SupTrac' });
});

var user = require('./routes/user.js');
var api = require('./routes/api.js');

app.post('/login', user.login);

//app.all('/api/*', user.authenticate);
app.get('/api/tickets', api.getTickets);
app.get('/api/newTickets', api.getNewTickets);
app.get('/api/ticket/:ticket_id', api.getTicket);
app.get('/api/user/:user_id', api.getUser);

app.post('/api/addTicket', api.createTicket);
app.post('/api/comment', api.createComment);

app.listen(8080);
console.log('Server is running at port 8080.');
