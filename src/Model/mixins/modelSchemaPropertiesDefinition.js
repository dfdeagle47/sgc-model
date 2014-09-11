define([], function () {
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


				if (this._generatedGetterAndSetter()[attribute]) {
					return;
				}
				var descriptor = {};

				var getter = this._defineGetter(attribute);
				if (getter) {
					descriptor.get = getter;	
				};
				
				var setter = this._defineSetter(attribute);
				if (setter) {
					descriptor.set = setter;
				}

				Object.defineProperty(this, attribute, descriptor);
				this._generatedGetterAndSetter()[attribute] = descriptor;
			},

			_defineGetter: function (attribute) {
				if (this.__existGetterForAttribute(attribute)) {
					return this[attribute.asGetter()];
				}

				return function () {
					return this.get(attribute);
				};
			},

			_defineSetter: function (attribute) {
				if (this.__existSetterForAttribute(attribute)) {
					return this[attribute.asSetter()];
				}

				return function (value) {
					return this.set(attribute, value);
				};
			}

		};

	};

});
