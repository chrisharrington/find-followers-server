"use strict";

require("./lib/globals");

var User = include("data/models").User,
	favourites = include("tasks/twitter-favourites");

include("data").initialize().then(function() {
	User.findOne({ name: "Chris Harrington" }, function(err, user) {
		if (err)
			console.log(err);
		else {
			favourites.go(user).then(function(user) {
				console.log(user);
			});
		}
	});
});