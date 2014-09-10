define([
	'backbone',
	'./mixins/modelSchemaPropertiesDefinition',
	'./mixins/modelGetter',
	'./mixins/modelSetter'
], function (
	Backbone,
	modelSchemaPropertiesDefinition,
	modelGetter,
	modelSetter
	) {
	'use strict';

	var SagaModel = Backbone.Model.extend({
		constructor: function(attributes, options){
			options = _.defaults(options||{}, {
				automaticGetterAndSetter:false
			});

			//Memory management
			// this.__constructorOptions = options;
			// window.instances[this.cid] = this;

			Backbone.Model.prototype.constructor.apply(this, arguments);

			if (options.automaticGetterAndSetter) {
				if (attributes) {
					this._generateGetSetForAttributes(_.keys(attributes));
				}
			}
		},

		clear: function(){
			this.stopListening();
			this.collection && (this.collection = null);
			this._SGISCLEARED = true;
			// debugger
			// window.instances[this.cid] = "cleared";

			return Backbone.Model.prototype.clear.apply(this, arguments);
		}
	});

	_.extend(SagaModel.prototype, modelSchemaPropertiesDefinition(SagaModel));
	_.extend(SagaModel.prototype, modelGetter(SagaModel));
	_.extend(SagaModel.prototype, modelSetter(SagaModel));

	return SagaModel;
});