"use strict";

var User = include("data/models").User;

module.exports = function(req, res, next) {
	User.findOne({ handle: req.query.handle }, function(err, user) {
		req.user = user;
		next();
	});
};