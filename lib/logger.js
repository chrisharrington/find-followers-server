var Log = include("data/models").Log,
    Promise = require("bluebird"),
    traceback = require("traceback");

module.exports = function(userId) {
    this.info = function(message) {
        return _message(userId, "info", message);
    };

    this.error = function(message) {
        return _message(userId, "error", message);
    }
}

function _message(userId, level, message) {
    var stack = traceback();
    return new Promise(function(resolve, reject) {
        new Log({
            userId: userId,
            level: level,
            message: message,
            file: stack[2].path
        }).save(function(err) {
            if (err) reject(err);
            else resolve();
        });
    });
}
