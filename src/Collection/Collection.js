define([
	'./mixins/collectionHelpers',
	// './mixins/collectionPagination',
	'./mixins/collectionSync',
	'../Model/Model'
], function (
	collectionHelpers,
	// collectionPagination,
	collectionSync,
	Model
) {
	'use strict';

	var Backbone = require('backbone');

	var SagaCollection = Backbone.Collection.extend({

		model:Model,

		// constructor: function (attrs) {

			// options = _.defaults(options||{}, {
			// 	url: null,
			// 	parent: null
			// });

			// this.removePaginate();
			// this.resetSGSort();
			// this.resetSGFilter();

			// if (options.url) {
			// 	this.url = options.url;
			// }

			// if (options.parent) {
			// 	this.parent = options.parent;
			// }

		// 	var res = Backbone.Collection.prototype.constructor.apply(this, arguments);
			
		// 	// this.updateUrl();
		// 	return res;
		// },

		//for mongoose model
		// updateUrl: function () {
		// 	if (this) {
		// 		if (!this.id) {
		// 			var eventName = 'change:' + this.idAttribute;

		// 			this.listenTo(this, eventName, function (parentModel) {
		// 				var parentUrl = parentModel.url;
		// 				if (typeof parentUrl === 'function') {
		// 					parentUrl = parentUrl();
		// 				}

		// 				// get my path from parent.
		// 				// this.url = parentUrl + '/' + this.parent.path;
		// 			}, this);
		// 		}
		// 	}
		// }
	});

	_.extend(SagaCollection.prototype, collectionHelpers(SagaCollection));
	// _.extend(SagaCollection.prototype, collectionPagination(SagaCollection));
	_.extend(SagaCollection.prototype, collectionSync(SagaCollection));

	return SagaCollection;
});
