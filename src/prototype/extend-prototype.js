define([
], function (
	) {
	'use strict';

	var Backbone = require('backbone');


	var getClasses = function(){
		if (!window.SGClasses) {
			window.SGClasses = {};
		}
		return window.SGClasses;
	};

	var addClass = function(className, clazz){
		var classes = getClasses();
		if (classes[className]) {
			throw new Error('Class already use');
		}

		classes[className] = clazz;
	};

	window.getClass = function(className){
		return getClasses()[className];
	};


	var defaultExtend = Backbone.Model.extend;
	var newExtend = function(instanceMethods, classesMethods, className){
		var res =  defaultExtend.apply(this, arguments);

		if (_.isString(classesMethods)) {
			className = classesMethods;
		}

		if (_.isString(className)) {
			addClass(className, res);
		}

		return res;
	};

	Backbone.Model.extend = Backbone.Collection.extend = Backbone.Router.extend = Backbone.View.extend = Backbone.History.extend = newExtend;


});