define([
	'sgc-model',
	'chai',
], function (SGCModel, chai) {
	'use strict';

	return function(){
		var expect = chai.expect;

		chai.should();

		var Model = SGCModel.Model;

		//Events
		describe('Test getter mixin', function () {

			it('test exist getter for attribute ', function () {
				var ExtendedModel = Model.extend({
					getMyCustomAttributeName: function(newName){
						this.get('myCustomAttributeName', 'customSet', {getterForce:true});
					}
				});
				var model = new ExtendedModel();
				chai.assert.equal(model.__existGetterForAttribute('myCustomAttributeName'), true)
			});

			// __existGetterForAttribute
			it('test not exist getter for attribute ', function () {
				var model = new Model();
				chai.assert.equal(model.__existGetterForAttribute('myCustomAttributeName'), false)
			});	

			it('Testing custom getter access with get("attr")', function () {
				var ExtendedModel = Model.extend({
					getName: function(){
						return "XYZ"
					}
				});
				var model = new ExtendedModel();

				chai.assert.equal(model.get('name'), 'XYZ')
			});


			it('Testing custom getter getter redirection', function () {
				var ExtendedModel = Model.extend({
					getName: function(){
						return this.get('customvalue');
					}
				});

				var model = new ExtendedModel();
				model.set('customvalue', 'XYZ');

				chai.assert.equal(model.get('name'), 'XYZ')
			});

		});	

	}
});
