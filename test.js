"use strict";

require("./lib/globals");

var scheduler = require("node-schedule");

var job = scheduler.scheduleJob("0 0/1 * 1/1 * ? *", function() {
    console.log(new Date());
});

console.log(job);
