define([
	'./mixins/collectionHelpers',
	'./mixins/collectionSync',
	'../SagaModel/Model'
], function (
	collectionHelpers,
	collectionSync,
	Model
) {
	'use strict';

	var Backbone = require('backbone');

	var SagaCollection = Backbone.Collection.extend({

		model:Model,

	});

	_.extend(SagaCollection.prototype, collectionHelpers(SagaCollection));
	_.extend(SagaCollection.prototype, collectionSync(SagaCollection));

	return SagaCollection;
});
