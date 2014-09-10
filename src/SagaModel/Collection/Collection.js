define([
	'backbone',

	'./mixins/collectionHelpers',
	'./mixins/collectionPagination',
	'./mixins/collectionSync'
], function (
	Backbone,
	collectionHelpers,
	collectionPagination,
	collectionSync

) {
	'use strict';
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

		updateUrl: function(){

			if (this.parent.instance) {
				if (!this.parent.instance.id) {
					var me = this;
					this.listenTo(this.parent.instance, 'change:'+this.parent.instance.idAttribute, function(parentModel){
						var parentUrl = typeof parentModel.url === 'string' ? parentModel.url : parentModel.url();
						me.url = parentUrl+'/'+me.parent.path;
					});
				}
			}
		}
	});

	_.extend(SagaCollection.prototype, collectionHelpers(SagaCollection));
	_.extend(SagaCollection.prototype, collectionPagination(SagaCollection));
	_.extend(SagaCollection.prototype, collectionSync(SagaCollection));

	return SagaCollection;
});