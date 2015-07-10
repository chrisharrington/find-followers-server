"use strict";

require("./lib/globals");

var scheduler = require("node-schedule"),
    _ = require("lodash"),
    Mongoose = require("mongoose"),
    moment = require("moment"),

    User = include("data/models").User,
    Favourite = include("data/models").Favourite,

    config = include("config"),
    twitterFavourites = include("tasks/twitter-favourites"),

    Twitter = include("apis/twitter");

include("data").initialize().then(function() {
    Favourite.aggregate()
        .match({ userId: Mongoose.Types.ObjectId("559c7bf27db075878681b30d") })
        .group({ _id: { term: "$term", date: "$created" }, count: { $sum: 1 } })
        .exec(function(err, favourites) {
            console.time("blah");
            _format(favourites);
            console.timeEnd("blah");
            process.exit();
        });

    //User.findOne({}, funqction(err, user) {
        // twitterFavourites.go(user).then(function() {
        //     console.log("Done.");
        // }).catch(function(e) {
        //     console.log(e.stack || e);
        // }).finally(function() {
        //     process.exit();
        // });
    //});
});

//{ _id: { term: "#javascript", date: "the date" }, count: 123 };

function _format(favourites) {
    favourites = _.sortBy(favourites, function(f) {
        return moment(f._id.date).toDate();
    });

    var initial = {};
    _.each(_getDates(favourites), function(d) {
        initial[moment(d).format("M/D")] = 0;
    });

    var data = {};
    _.each(favourites, function(f) {
        var term = f._id.term;
        if (!data[term])
            data[term] = _.clone(initial);

        data[term][moment(f._id.date).format("M/D")] = f.count;
    });

    var transformed = {};
    for (var name in data) {
        transformed[name] = [];
        for (var key in data[name])
            transformed[name].push(data[name][key]);
    }

    console.log(transformed);
}

function _formatOld(favourites) {
    // 184ms

    favourites = _.sortBy(favourites, function(f) {
        return moment(f._id.date).toDate();
    });

    var dates = _getDates(favourites);

    var data = _.map(_getTerms(favourites), function(t) {
        return {
            term: t,
            counts: _.map(dates, function(d) {
                var found = _.find(favourites, function(f) {
                    return f._id.term === t && moment(f._id.date).isSame(d);
                });
                return found ? found.count : 0;
            })
        }
    });

    //console.log(data);
}

function _getTerms(favourites) {
    return _.chain(favourites)
        .pluck("_id.term")
        .unique()
        .value();
}

function _getDates(favourites) {
    return _.chain(favourites)
        .pluck("_id.date")
        .map(function(d) { return moment(d); })
        .unique()
        .value();
}
