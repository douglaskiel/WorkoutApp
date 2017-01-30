var express = require('express');
var app = express();

app.use('/api/test', function(req, res) {
	res.send("Hello Canada");
});

app.listen(3200, function() {
	console.log("app listening on 3200");
});