"use strict";

var Favourite = include("data/models").Favourite,
	Mongoose = require("mongoose"),
	_ = require("lodash"),
	moment = require("moment");

module.exports = function(app) {
	app.get("/favourites", include("middleware/auth"), function(req, res) {
		Favourite.aggregate()
			.match({ userId: Mongoose.Types.ObjectId("559c7bf27db075878681b30d") })
			.group({ _id: { term: "$term", date: "$created" }, count: { $sum: 1 } })
			.exec(function(err, favourites) {
				if (err)
					res.status(500).send(err);
				else
					res.send(_format(favourites));
			});
	});
};

function _format(favourites) {
	favourites = _.sortBy(favourites, function(f) {
        return moment(f._id.date).toDate();
    });

	var dates = _getDates(favourites),
		initial = _buildInitialData(dates, favourites),
		data = _buildTermData(favourites, initial),
		transformed = _transformData(data);

	return {
		dates: _formatDates(dates),
		data: transformed
	};
}

function _formatDates(dates) {
	return _.chain(dates)
		.map(function(d) { return d.format("M/D"); })
		.unique()
		.value();
}

function _transformData(data) {
	var transformed = {};
    for (var name in data) {
        transformed[name] = [];
        for (var key in data[name])
            transformed[name].push(data[name][key]);
    }
	return transformed;
}

function _buildTermData(favourites, initial) {
	var data = {};
    _.each(favourites, function(f) {
        var term = f._id.term;
        if (!data[term])
            data[term] = _.clone(initial);

        data[term][moment(f._id.date).format("M/D")] = f.count;
    });
	return data;
}

function _buildInitialData(dates, favourites) {
	var initial = {};
	_.each(dates, function(d) {
		initial[moment(d).format("M/D")] = 0;
	});
	return initial;
}

function _getDates(favourites) {
    return _.chain(favourites)
        .pluck("_id.date")
        .map(function(d) { return moment(d); })
        .unique()
        .value();
}

function _getTerms(favourites) {
    return _.chain(favourites)
        .pluck("_id.term")
        .unique()
        .value();
}
