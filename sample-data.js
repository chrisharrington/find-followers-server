"use strict";

require("./lib/globals");

var Promise = require("bluebird"),
    _ = require("lodash"),
    moment = require("moment"),

    config = include("config"),

    User = include("data/models").User,
    Favourite = include("data/models").Favourite;

var DAYS = 100;

include("data").initialize().then(function() {
    User.findOne({}, function(err, user) {
        _removeFavourites(user).then(function() {
            return Promise.all([
                _insertFavourites(user)
            ]);
        }).then(function() {
            console.log("Done.");
        }).catch(function(e) {
            console.log(e.stack || e);
        }).finally(function() {
            process.exit();
        });
    });
});

function _removeFavourites(user) {
    return new Promise(function(resolve, reject) {
        Favourite.remove({ userId: user._id }, function(err) {
            if (err) reject(err);
            resolve();
        });
    });
}

function _insertFavourites(user) {
    var now = moment(),
        first = now.clone().add(DAYS*-1, "days"),
        promises = [];

    for (var date = first; date < moment(); date = date.add(1, "day")) {
        if (date.isSame(now.clone().add(-60, "days"), "day"))
            user.terms.push("#blah");
        if (date.isSame(now.clone().add(-30, "days"), "day"))
            user.terms.push("#boo");
        for (var i = 0; i < config.favouriteCount*8; i++)
            promises.push(_insertFavourite(user, date, _randomTerm(user)));
        }

    return Promise.all(promises);
}

function _insertFavourite(user, created, term) {
    return new Promise(function(resolve, reject) {
        new Favourite({
            userId: user._id,
            twitterId: "the twitter id",
            created: created.toISOString(),
            term: term
        }).save(function(err) {
            if (err) reject(err);
            else resolve();
        });
    });
}

function _randomTerm(user) {
    var terms = user.terms,
        length = terms.length;

    return user.terms[Math.floor((Math.random() * 10000) % (length))];
}
