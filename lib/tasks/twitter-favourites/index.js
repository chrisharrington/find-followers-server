"use strict";

var Promise = require("bluebird"),
	Pipeline = include("pipeline");

module.exports = {
	go: function(user) {
		return new Pipeline([
			require("./get-tweets"),
            require("./flatten-tweets"),
            require("./filter-favourites"),
			require("./apply-weights-to-tweets"),
			require("./sort-tweets"),
            require("./take-max-tweets")
		]).go(user).then(function(tweets) {
			return require("./insert-default-historical-data")(user, tweets).then(function() {
				//return require("./set-favourites");
				return Promise.resolve();
			}).then(function() {
				return require("./update-data-metrics")(user, tweets);
			});
		});
	}
};
