"use strict";

require("./lib/globals");

var data = include("data");

data.initialize().then(function() {
    require("./server").go();
    include("./scheduler").go();
});
