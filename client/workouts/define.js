$(function() {
	$.extend(WorkoutLog, {
		definition: {
			userDefinition: [],

			create: function() {
				var def = {
					desc: $("#def-description").val(),
					type: $("#def-logtype").val()
				};

				var postData = { definition: def };
				var define = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(postData),
					contentType: "application/json"
				});

				define.done(function(data) {

					WorkoutLog.definition.userDefinition.push(data.definition);
				});
		   },

		   fetchAll: function() {
		   		var fetchDefs = $.ajax ({
		   			type: "GET",
		   			url: WorkoutLog.API_BASE + "definition",
		   			headers: {
		   				"authorization": window.localStorage.getItem("sessionToken")
		   			}
		   		})
		   		.done(function(data) {
		   			WorkoutLog.definition.userDefinition = data;
		   		})

		   		.fail(function(err) {
		   			console.log(err);
		   		});
		   }
		}
	});

	// bindings
	$("#def-save").on("click", WorkoutLog.definition.create);

	// fetch definitions if we already are authenticated and refreshed
	if (window.localStorage.getItem("sessionToken")) {
		WorkoutLog.definition.fetchAll();
	}
});




