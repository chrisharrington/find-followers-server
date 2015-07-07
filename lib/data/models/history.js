"use strict";

var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

module.exports = {
	name: "History",
	schema: new Schema({
		userId: { type: String },
        created: { type: Date, default: Date.now },
        terms: { type: Array, default: [] }
	})
};
