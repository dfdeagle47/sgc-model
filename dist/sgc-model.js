define('prototype/extend-prototype',[
], function (
	) {
	

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
define('SagaCollection/mixins/collectionHelpers',[], function () {
	

	return function (/*SagaCollection*/) {

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
				});

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
				if (_.isEmpty(attrs)) {
					 return first ? void 0 : [];
				}
				
				return this[first ? 'find' : 'filter'](function(model) {
					if (model.equal(attrs)) {
						return true;
					}
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

define('SagaCollection/mixins/collectionSync',[], function () {
	

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

define('Utils/utils',[], function (
) {
	

	var utils = {};

	utils.asGetter = function(string){
		return 'get'+utils.capitalize(string);
	};

	utils.asSetter = function(string){
		return 'set'+utils.capitalize(string);
	};

	utils.capitalize = function(string) {
		var capitalized = '';
		var split = string.split('.');
		split.forEach(function(part){
			capitalized += part.charAt(0).toUpperCase()+part.slice(1);
		});
	    return capitalized;
	};

	utils.contains = function(string, str){
		return ~string.indexOf(str);
	};

	utils.startsWith = function(string, str){
		return string.slice(0, str.length) === str;
	};

	utils.endsWith = function(string, str){
		return string.slice(string.length - str.length, string.length) === str;
	};
	return utils;
});

define('SagaModel/mixins/modelSchemaPropertiesDefinition',[
	'../../Utils/utils'
], function (utils) {
	

	return function (/*SagaModel*/) {

		return {

			_generateGetSetForAttributes: function (attributes) {
				for (var i = attributes.length - 1; i >= 0; i--) {
					this._generateGetSetForAttribute(attributes[i]);
				}
			},

			_generatedGetterAndSetter: function () {
				if (!this.__generatedGetterAndSetter) {
					this.__generatedGetterAndSetter = {};
				}
				return this.__generatedGetterAndSetter;
			},

			_generateGetSetForAttribute: function (attribute, options) {
				options = _.defaults(options||{}, {
					getter:true,
					setter:true
				});

				if (this._generatedGetterAndSetter()[attribute]) {
					return;
				}
				var descriptor = {};

				var getter = this._defineGetter(attribute);
				if (getter && options.getter) {
					descriptor.get = getter;	
				}
				
				var setter = this._defineSetter(attribute);
				if (setter, options.setter) {
					descriptor.set = setter;
				}

				Object.defineProperty(this, attribute, descriptor);
				this._generatedGetterAndSetter()[attribute] = descriptor;
			},

			_defineGetter: function (attribute) {
				if (this.__existGetterForAttribute(attribute)) {
					return this[utils.asGetter(attribute)];
				}

				return function () {
					return this.get(attribute);
				};
			},

			_defineSetter: function (attribute) {
				if (this.__existSetterForAttribute(attribute)) {
					return this[utils.asSetter(attribute)];
				}

				return function (value) {
					return this.set(attribute, value);
				};
			}

		};

	};

});

define('SagaModel/mixins/modelGetter',[
	'../../Utils/utils'
	], function (utils) {
	
	return function (/*SagaModel*/) {

		return {

			__existGetterForAttribute: function (attribute) {
				if (!_.isString(attribute)) {
					return false;
				}
				var getter = utils.asGetter(attribute);
				return (getter in this) && (_.isFunction(this[getter]));
			},

			get: function (attribute, options) {
				options = _.defaults(options || {}, {
					getterForce:false
				});

				if (!options.getterForce &&  this.__existGetterForAttribute(attribute)) {
					return this[utils.asGetter(attribute)](attribute, _.clone(options || {}));
				}

				return Backbone.Model.prototype.get.apply(this, arguments);
			}
		};

	};

});

define('SagaModel/mixins/modelSetter',[
	'../../Utils/utils'
	], function (utils) {
	

	return function (/*SagaModel*/) {

		return {

			__existSetterForAttribute: function (attribute) {
				if (!_.isString(attribute)) {
					return false;
				}
				var setter = utils.asSetter(attribute);
				return (setter in this) && (_.isFunction(this[setter]));
			},

			set: function SGSetter(attribute, raw, options) {
				if (_.isObject(attribute) && _.isObject(raw) && !options) {
					options = raw;
				}

				options = _.defaults(options || {}, {
					setterForce: false,
					setEach: false
				});

				if (!options.setterForce &&  this.__existSetterForAttribute(attribute)) {
					return this[utils.asSetter(attribute)](raw, _.clone(options || {}));
				}

				if (options.setEach && _.isObject(attribute)) {
					_.each(attribute, function (value, key) {
						this.set(key, value, _.clone(options), attribute);
					}, this);
					return;
				}

				return Backbone.Model.prototype.set.apply(this, [attribute, raw, options]);
			}

		};

	};

});

define('SagaModel/mixins/modelEvents',[
    '../../Utils/utils'
], function(
    utils
) {
    
    
    function cutTrigger(trigger) {
        var res = {};
        var mPath = trigger.replace('change:', '');
        res.submodelName = mPath.split('.')[0];
        res.subTrigger = 'change:' + mPath.replace(res.submodelName + '.', '');
        return res;
    }

    return function() {
        return {

            __isMpathTrigger: function(trigger) {
                return _.isString(trigger) && utils.contains(trigger, '.') && utils.startsWith(trigger, 'change:');
            },

            on: function(trigger, callback, context) {
                if (this.__isMpathTrigger(trigger)) {
                    var newTrigger = cutTrigger(trigger);
                    var subModel = this.get(newTrigger.submodelName);
                    if (subModel instanceof Backbone.Model) {
                        subModel.on(newTrigger.subTrigger, callback, context);
                        return;
                    } else {
                        throw new Error('Unknow model');
                    }
                }
                return Backbone.Model.prototype.on.apply(this, arguments);
            },

            off: function(trigger, callback, context) {
                if (_.isString(trigger) && utils.contains('.', trigger) && utils.startsWith(trigger, 'change:')) {
                    var newTrigger = cutTrigger(trigger);
                    var subModel = this.get(newTrigger.submodelName);
                    if (subModel instanceof Backbone.Model) {
                        subModel.off(newTrigger.subTrigger, callback, context);
                        return;
                    } else {
                        throw new Error('Unknow model');
                    }
                }
                return Backbone.Model.prototype.off.apply(this, arguments);
            }
        };
    };
});
define('SagaModel/mixins/modelHelpers',[
	], function () {
	

	return function (/*SagaModel*/) {

		return {
			query: function(attrs){
				if (!attrs) {
					return undefined;
				}
		        for (var key in attrs) {
		        	if (_.isFunction(attrs[key])) {
		        		if (!attrs[key](this.get(key))) {
		        			return false;
		        		}
		        	} else {
		        		if (attrs[key] !== this.get(key)) {
		        			return false;
		        		}
		        	}
		        }
		        return true;
			}
		};

	};

});

define('SagaModel/Model',[
	'./mixins/modelSchemaPropertiesDefinition',
	'./mixins/modelGetter',
	'./mixins/modelSetter',
	'./mixins/modelEvents',
	'./mixins/modelHelpers'
], function (
	modelSchemaPropertiesDefinition,
	modelGetter,
	modelSetter,
	modelEvents,
	modelHelpers
) {
	

	var Backbone = require('backbone');

	var SagaModel = Backbone.Model.extend({

		constructor: function (attributes, options) {
			options = _.defaults(options || {}, {
				automaticGetterAndSetter:false
			});

			if (_.isString(attributes)) {
				var identifier = attributes;
				attributes = {};
				attributes[this.idAttribute] = identifier;
			}

			var res = Backbone.Model.prototype.constructor.apply(this, [attributes, options]);

			if (options.automaticGetterAndSetter) {
				if (attributes) {
					this._generateGetSetForAttributes(_.keys(attributes));
				}
			}

			return res;
		},

		clear: function () {
			this.stopListening();

			if (this.collection) {
				this.collection = null;
			}

			return Backbone.Model.prototype.clear.apply(this, arguments);
		}

	});


	_.extend(SagaModel.prototype, modelEvents(SagaModel));
	_.extend(SagaModel.prototype, modelSchemaPropertiesDefinition(SagaModel));
	_.extend(SagaModel.prototype, modelGetter(SagaModel));
	_.extend(SagaModel.prototype, modelSetter(SagaModel));
	_.extend(SagaModel.prototype, modelHelpers(SagaModel));
	

	return SagaModel;

});

define('SagaCollection/Collection',[
	'./mixins/collectionHelpers',
	'./mixins/collectionSync',
	'../SagaModel/Model'
], function (
	collectionHelpers,
	collectionSync,
	Model
) {
	


	var Backbone = require('backbone');

	var SagaCollection = Backbone.Collection.extend({

		model:Model,

	});

	_.extend(SagaCollection.prototype, collectionHelpers(SagaCollection));
	_.extend(SagaCollection.prototype, collectionSync(SagaCollection));

	return SagaCollection;
});

define('sgc-model',[
	'./prototype/extend-prototype',
	'./SagaCollection/Collection',
	'./SagaModel/Model',
	'./Utils/utils'
	
], function (
	backbonePrototype,
	Collection,
	Model,
	utils
	) {
	
	
	return {
		Collection: Collection,
		Model: Model,
		utils:utils

	};


});
