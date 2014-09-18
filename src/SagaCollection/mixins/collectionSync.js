define([], function () {
	'use strict';

	return function (/*SagaCollection*/) {

		return {

			// _isLoading: false,

			//for mongoose schema
			// fetch: function (options) {
			// 	// options = _.defaults(options || {}, {
			// 	// 	paginate:false
			// 	// });

			// 	// if (options.paginate) {
			// 	// 	options = this._preparePaginateFetchOptions(options);
			// 	// }

			// 	// options = this._prepareQueryOptions(options);

			// 	this._isLoading = true;
			// 	this.trigger('loading-start');

			// 	var success = options.success;

			// 	var me = this;
			// 	options.success = function () {
			// 		me._isLoading = false;
			// 		me.trigger('Fetch:success');
			// 		me.trigger('loading-stop');

			// 		if (success) {
			// 			success.apply(this, arguments);
			// 		}
			// 	};

			// 	options.error = function (error) {
			// 		if (error && error.apply) {
			// 			error.apply(this, arguments);
			// 		}

			// 		me.trigger('Fetch:error', error);
			// 		me._isLoading = false;
			// 		me.trigger('loading-stop');
			// 	};

			// 	return Backbone.Collection.prototype.fetch.apply(this, [options]);
			// },


			// isLoading: function () {
			// 	return this._isLoading;
			// }

		};

	};

});
