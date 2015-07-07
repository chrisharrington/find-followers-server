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
            require("./take-max-tweets"),
			require("./insert-default-historical-data").bind(this, user),
			//require("./set-favourites"),
			//require("./update-data-metrics").bind(this, user)
		]).go(user);
	}
};
