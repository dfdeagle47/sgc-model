define(function (require) {
	'use strict';

	var Collection = require('./SagaModel/Collection/Collection');
	var Model = require('./SagaModel/Model/Model');

	return {
		Collection: Collection,
		Model: Model
	};
});