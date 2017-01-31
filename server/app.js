var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('workoutlog', 'postgres', '00sGbp4trctir', {
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);

// build a user model in sqllize
var User = sequelize.define('user', {
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING,
});

//creates the table in postgres
//matches the model we defined
//Doesn't drop the db
User.sync(); 
// User({ force: true }); //drops the table compeletly (line 27ish)

app.use(bodyParser.json());

app.post('/api/user', function(req, res){
	//when we post to api user, it will want a user object in the body
	var username = req.body.user.username;
	var pass = req.body.user.password;	//TODO: hash this password - HASH=not human readable

	//Match the model we create above
	//Sequelize - take the user model and go out to the db and create this:
	User.create({
		username: username,
		passwordhash: ''
}).then(
		//Sequelize is going to return the object it created from db.
		function createSuccess(user){
			//successful get thsi:
			res.json({
				user: user,
				message: 'create'
			});
		},
		function createError(err){
			res.send(500, err.message);
		}
	);
});

app.use(require('./middleware/headers'));

app.use('/api/test', function(req, res){
	res.send("Hello Cambodia");
});

app.listen(3000, function(){
	console.log("app listening on port 3000");
});
// var express = require('express');
// var app = express();
// var bodyParser = require("body-parser");

// app.use(require("./middleware/headers"));

// app.use('/api/test', function(req, res) {
// 	res.send("Hello Canada");
// });

// // this function tells you that your working on the server
// app.listen(3000, function() {
// 	console.log("app listening on 3000");
// });

// // adding sequelize to the program to communicate with postgres
// var Sequelize = require("sequelize");
// var sequelize = new Sequelize("workoutapp", "postgres", "00sGbp4trctir", {
// 	host: "localhost",
// 	dialect: "postgres"
// });

// sequelize.authenticate().then(
// 	function() {
// 		console.log("connected to workoutapp postgres db");
// 	},
// 	function(err){
// 		console.log(err);
// 	}
// );

// // This is a user model in sqllize to store data to the database
// var User = sequelize.define("user", {
// 	username: Sequelize.STRING,
// 	passwordhash: Sequelize.STRING,
// });