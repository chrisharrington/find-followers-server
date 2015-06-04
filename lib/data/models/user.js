"use strict";

var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
 
module.exports = {
	name: "User",
	schema: new Schema({
		name: { type: String, required: true },
		email: { type: String, required: true, match: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i },
		created: { type: Date, default: Date.now },
		accessToken: { type: String, required: true },
		terms: { type: Array, default: [] }
	})
};