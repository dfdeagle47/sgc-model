define([], function (
) {
	'use strict';

	String.prototype.asGetter = function(){
		return 'get'+this.capitalize();
	};

	String.prototype.asSetter = function(){
		return 'set'+this.capitalize();
	};

	String.prototype.capitalize = function() {
		var capitalized = "";
		var split = this.split('.');
		split.forEach(function(part){
			capitalized += part.charAt(0).toUpperCase()+part.slice(1);
		});
	    return capitalized;
	};

	String.prototype.contains = function(str){
		return ~this.indexOf(str);
	};

	String.prototype.startsWith = function(str){
		return this.slice(0, str.length) === str;
	};

	String.prototype.endsWith = function(str){
		return this.slice(this.length - str.length, this.length) === str;
	};


});
