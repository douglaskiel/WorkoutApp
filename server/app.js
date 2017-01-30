var express = require('express');
var app = express();

app.use(require("./middleware/headers"));


app.use('/api/test', function(req, res) {
	res.send("Hello Canada");
});

// this function tells you that your working on the server
app.listen(3000, function() {
	console.log("app listening on 3000");
});

