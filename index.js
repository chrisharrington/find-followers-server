"use strict";

require("./lib/globals");

var data = include("data");

data.initialize().then(function() {
    require("./server").go();
    //require("./scheduler").go();
});
