"use strict";

require("./lib/globals")

var User = include("data/models").User,

    favourites = include("tasks/twitter-favourites"),

    _ = require("lodash");

include("data").initialize().then(function() {
    User.findOne({}, function(err, user) {
        favourites.go(user).then(function(tweets) {
            console.log(tweets);
        }).catch(function(err) {
            console.log(err);
        }).finally(function() {
            process.exit();
        });
    });
});
