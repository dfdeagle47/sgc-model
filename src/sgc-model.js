define(function (require) {
	'use strict';

	var Collection = require('./Collection/Collection');
	var Model = require('./Model/Model');
	var utils = require('./Utils/utils');

	return {
		Collection: Collection,
		Model: Model,
		utils:utils
	};
});