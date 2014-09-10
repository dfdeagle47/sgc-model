define([
	'./mixins/collectionHelpers',
	'./mixins/collectionPagination',
	'./mixins/collectionSync'
], function (
	collectionHelpers,
	collectionPagination,
	collectionSync
) {
	'use strict';

	var Backbone = require('backbone');

	var SagaCollection = Backbone.Collection.extend({

		_isLoading: false,

		_sort: {
			//field: asc|desc
		},

		_filters: {

		},

		parent: {
			instance: null,
			path: null
		},

		constructor: function (attrs, options) {
			this.removePaginate();
			this.resetSGSort();
			this.resetSGFilter();

			if (options) {
				if (options.url) {
					this.url = options.url;

				}
				if (options.parent) {
					this.parent = options.parent;
				}
			}

			var res = Backbone.Collection.prototype.constructor.apply(this, arguments);
			this.updateUrl();
			return res;
		},

		updateUrl: function () {
			if (this.parent.instance) {
				if (!this.parent.instance.id) {
					var eventName = 'change:' + this.parent.instance.idAttribute;

					this.listenTo(this.parent.instance, eventName, function (parentModel) {
						var parentUrl = parentModel.url;
						if (typeof parentUrl === 'function') {
							parentUrl = parentUrl();
						}

						this.url = parentUrl + '/' + this.parent.path;
					}, this);
				}
			}
		}
	});

	_.extend(SagaCollection.prototype, collectionHelpers(SagaCollection));
	_.extend(SagaCollection.prototype, collectionPagination(SagaCollection));
	_.extend(SagaCollection.prototype, collectionSync(SagaCollection));

	return SagaCollection;
});
