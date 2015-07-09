"use strict";

var Promise = require("bluebird"),

    setFavouritesWithTwitter = require("./set-as-favourite-with-twitter"),
    saveFavouriteInfo = require("./save-favourite-info");

module.exports = function(user, tweets) {
    return Promise.all([
        //setFavouritesWithTwitter(user, tweets),
        saveFavouriteInfo(user, tweets)
    ]);
};
