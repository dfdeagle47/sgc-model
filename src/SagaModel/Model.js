define([
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
	'use strict';

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
