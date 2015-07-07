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
			//require("./set-favourites"),
			_recordData.bind(this, user)
		]).go(user);
	}
};

function _recordData(user, tweets) {
	return require("./record-data")(user, tweets);
}
