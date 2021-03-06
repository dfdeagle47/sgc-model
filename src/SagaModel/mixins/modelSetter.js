define([
	'../../Utils/utils'
	], function (utils) {
	'use strict';

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
