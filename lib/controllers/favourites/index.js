"use strict";

var Favourite = include("data/models").Favourite;

module.exports = function(app) {
	app.get("/favourites", include("middleware/auth"), function(req, res) {
        Favourite.find({ userId: req.user._id }, function(err, favourites) {
            response.send(favourites);
        });
	});
};
