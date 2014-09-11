define([], function () {
	'use strict';

	return function (SagaCollection) {

		return {

			isEmpty: function () {
				return this.length === 0;
			},

			previousModel: function (model) {
				if (!model) {
					return;
				}

				var index = this.indexOf(model);
				if (index === -1) {
					return;
				}

				return this.at(index - 1);
			},

			nextModel: function (model) {
				if (!model) {
					return;
				}

				var index = this.indexOf(model);
				if (index === -1) {
					return;
				}

				return this.at(index + 1);
			},

			//Move in model constructor
			// add: function (model, options) {
			// 	//Try add simple _id
			// 	if (_.isString(model)) {
			// 		// _isId = true;
			// 		this.add({_id:model}, options);
			// 	}
			// 	return Backbone.Collection.prototype.add.apply(this, [model, options]);
			// },

			// set: function (models, options) {

			// 	//ids array
			// 	if (_.isArray(models) && models.length && !_.isObject(models[0])) {
			// 		var wrappedModels = [];
			// 		models.forEach(function (model) {
			// 			wrappedModels.push({
			// 				_id: model
			// 			});
			// 		});
			// 		models = wrappedModels;
			// 		return this.set(models, options);
			// 	}

			// 	return Backbone.Collection.prototype.set.apply(this, arguments);
			// },


			remove: function (models, options) {
				options = _.defaults(options||{}, {
					predicate:null
				})

				if (options.predicate && _.isFunction(options.predicate)) {
					var toRemove = this.filter(options.predicate);
					this.remove(toRemove);
					return toRemove;
				}

				return Backbone.Collection.prototype.remove.apply(this, arguments);
			},


			// removeAll: function () {
			// 	this.models = 
			// 	this.reset([]);
			// 	// var removed = [];
			// 	// for (var i = this.models.length - 1; i >= 0; i--) {
			// 	// 	removed.push(this.models[i]);
			// 	// }
			// 	// this.remove(removed);
			// 	this.resetPaginate();
			// 	this.trigger('remove:all');
			// 	return removed;
			// },

			clear: function (options)  {
				var models = this.models;

				this.reset([]);
				for (var i = models.length - 1; i >= 0; i--) {
					models[i].clear(options);
				}

				this.stopListening();

				if (this.parent) {
					this.parent = null;
				}
			},

		    where: function(attrs, first) {
				if (_.isEmpty(attrs)) return first ? void 0 : [];
				
				return this[first ? 'find' : 'filter'](function(model) {
					if (model.equal(attrs)) {
						return true;
					};
				});
		    },

			clone: function (options) {
				if (!options) {
					options = {};
				}
				var models = options.models || this.models;
				var clone = new this.constructor(models, {
					url: this.url,
					parent: this.parent
				});

				clone.sgSort(_.clone(this.getSGSort()));
				clone.sgFilter(_.clone(this.getSGFilter()));
				clone.sgPaginate(_.clone(this.getSGPaginate()));

				return clone;
			},


		};

	};

});
