"use strict";

module.exports = function() {
	this._cache = {};
	
	this.set = function(key, value) {
		this._cache[key] = value;
	};
	
	this.get = function(key) {
		return this._cache[key];
	};
};