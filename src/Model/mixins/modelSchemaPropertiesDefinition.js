define([
	'../../Utils/utils'
], function (utils) {
	'use strict';

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
