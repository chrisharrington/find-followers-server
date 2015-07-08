"use strict";

require("./lib/globals");

var User = include("data/models").User;

include("data").initialize().then(function() {
    User.findOne({}, function(err, user) {
        include("tasks/twitter-favourites").go(user).then(function() {
            console.log("Done.");
        }).catch(function(e) {
            console.log(e.stack || e);
        }).finally(function() {
            process.exit();
        });
    });
});
