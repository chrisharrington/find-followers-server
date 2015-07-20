"use strict";

var Log = include("data/models").Log;

module.exports = function(app) {
	app.get("/logs", include("middleware/auth"), function(req, res) {
        Log
            .find({})
            .sort("-created")
            .skip(req.params.skip || 0)
            .limit(req.params.take || 30)
            .exec(function(err, logs) {
                if (err) reject(err);
                else res.send(logs);
            });
	});
};

function _adminOnly(req, res, next) {
    if (req.user.email === "chrisharrington99@gmail.com")
        next();
    else
        res.sendStatus(401);
}
