"use strict";

var _ = require("lodash"),
	mongoose = require("mongoose"),
	directory = require("require-dir");

var models = {};

_.each(directory("./"), function(model) {
	models[model.name] = mongoose.model(model.name, model.schema);
});

module.exports = models;