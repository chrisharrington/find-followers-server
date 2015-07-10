"use strict";

var Favourite = include("data/models").Favourite,
	Mongoose = require("mongoose");

module.exports = function(app) {
	app.get("/favourites", include("middleware/auth"), function(req, res) {
		Favourite.aggregate()
			.match({ userId: Mongoose.Types.ObjectId("559c7bf27db075878681b30d") })
			.group({ _id: { term: "$term", date: "$created" }, count: { $sum: 1 } })
			.exec(function(err, favourites) {
				if (err)
					res.status(500).send(err);
				else
					res.send(favourites);
			});
	});
};
