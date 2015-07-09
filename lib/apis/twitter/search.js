"use strict";

var Promise = require("bluebird"),
    twitter = include("twitter-oauth"),
    querystring = require("querystring"),
    moment = require("moment");

module.exports = function(token, secret) {
	return function(term, sinceId) {
        return new Promise(function(resolve, reject) {
            twitter.search({ q: term, count: 100 }, token, secret, function(err, data) {
                if (err)
                   reject(err);
                else
                   resolve(data.statuses);
           });
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
