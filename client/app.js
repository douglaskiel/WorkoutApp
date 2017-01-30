$(document).ready(function () {
	$("#testAPI").on("click", function() {
		console.log("It's working");
	});

	// This is the ajax that communicating 
	// between the local and global hosts
	var test = $.ajax({
		type: "GET",
		url: "http://localhost:3000/api/test"
	});

	test.done(function(data) {
		console.log(data);
	});

	// this let's you know if your 
	// communication is not working
	test.fail(function() {
		console.log("Oi!!!");
	});
});