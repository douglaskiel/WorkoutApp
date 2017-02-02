require("dotenv").config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db');
var User = sequelize.import('./models/user');


//creates the table in postgres
//matches the model we defined
//Doesn't drop the db
sequelize.sync(); // sync({ force: true }); drops the table compeletely! (line 27ish); 
// only use this when you need to drop and entire table
// DANGER!! If below is uncommented then it will break completely

app.use(bodyParser.json());

app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));

app.use('/api/test', function(req, res){
	res.send("Hello Cambodia");
});
// user route
app.use('/api/user', require('./routes/user'));
// login route
app.use('/api/login', require('./routes/session'));
app.use('/api/definition', require('./routes/definition'));

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