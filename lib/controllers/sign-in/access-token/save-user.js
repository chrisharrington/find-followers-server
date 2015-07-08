"use strict";

var Promise = require("bluebird"),
	User = include("data/models").User;

module.exports = function(user) {
	return _findUser(user).then(function(found) {
		return new Promise(function(resolve, reject) {
			if (found) {
				found.token = user.token;
				found.secret = user.secret;
				found.update({ $set: { token: user.token, secret: user.secret }}, function(err) {
					if (err) reject(err);
					else resolve(found);
				});
			} else
				new User(user).save(function(err, created) {
					if (err) reject(err);
					else resolve(created);
				});
		});
	});
};

function _findUser(user) {
	return new Promise(function(resolve, reject) {
		User.findOne({ handle: user.handle }, function(err, found) {
			if (err)
				reject(err);
			else
				resolve(found);
		});
	});
};
