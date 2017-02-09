// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens
var app        = express();
var config     = require('./config'); // get our config file
var morgan     = require('morgan');
var User     = require('./app/models/user');
var users=require('./app/routes/user')();
var items = require('./app/routes/item')();
var zips=require('./app/routes/zip')();

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('superSecret', config.secret); // secret variable
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Authorization, X-Requested-With, Content-Type, Accept");
  next();
});

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');

mongoose.connect(config.database); // connect to our database

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {
 
 console.log(req.body);
  // find the user
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 60*60*24
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
		  id: user.id,
		  username: user.username,
		  firstName: user.firstName,
		  lastName: user.lastName,
          token: token
        });
      }   

    }

  });
});

app.use('/items', items);
app.use('/zips',zips);
app.use('/api/users',users);
// REGISTER OUR ROUTES -------------------------------
app.use('/api/authenticate', router);
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
