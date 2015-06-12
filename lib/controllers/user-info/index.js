"use strict";

var Twitter = include("apis/twitter");

module.exports = function(app) {
	app.get("/user", function(req, res) {
		if (!req.user)
			res.send({});
		else {
			var twitter = new Twitter(req.user.token, req.user.secret);
			twitter.userInfo(req.user.handle).then(function(err, info) {
				if (err)
					_error(err, res);
				else
					res.send(info);
			}).catch(function(err) {
				_error(err, res);
			});
		}
	});
};

function _error(err, res) {
	res.status(500).send(err);
}