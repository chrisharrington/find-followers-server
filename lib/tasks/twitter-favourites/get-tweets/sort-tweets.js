"use strict";

var _ = require("lodash");

module.exports = function(data) {
	return new Promise(function(resolve, reject) {
        resolve(_.sortBy(data, function(datum) {
            return datum.weight * -1;
        }));
	});
};