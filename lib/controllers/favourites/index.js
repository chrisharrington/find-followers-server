"use strict";

var Favourite = include("data/models").Favourite;

module.exports = function(app) {
	app.get("/favourites", function(req, res) {
		if (!req.user)
			res.sendStatus(401);
		else {
            Favourite.find({ userId: req.user._id }, function(err, favourites) {
                response.send(favourites);
            });
		}
	});
};
