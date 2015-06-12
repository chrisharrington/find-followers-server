"use strict";

var Promise = require("bluebird"),
    twitter = include("twitter-oauth"),
    querystring = require("querystring"),
    moment = require("moment");

module.exports = function(token, secret) {
	return function(term, sinceId) {
        return new Promise(function(resolve, reject) {
//            oauth.get(_buildUrl("https://api.twitter.com/1.1/search/tweets.json", term), token, secret, function(err, data) {
//                if (err)
//                    reject(err);
//                else
//                    resolve(JSON.parse(data).statuses);
//            });
        });
	};
};

function _buildUrl(url, term, sinceId) {
    var params = {
        q: term,
        count: 100,
    };
    if (sinceId)
        params.sinceId = sinceId;
    else
        params.since = moment().format("YYYY-MM-DD");
    return url + "?" + querystring.stringify(params);
}