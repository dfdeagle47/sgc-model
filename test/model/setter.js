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
		describe('Test setter mixin', function () {

			it('test exist setter for attribute ', function () {
				var ExtendedModel = Model.extend({
					setName: function(newName){
						this.set('name', 'customSet', {setterForce:true});
					}
				});
				var model = new ExtendedModel();
				
				chai.assert.equal(model.__existSetterForAttribute('name'), true)
			});

			it('test not exist setter for attribute ', function () {
				var model = new Model();
				chai.assert.equal(model.__existSetterForAttribute('name'), false)
			});	

			it('Testing custom setter access with set("attr")', function () {
				var ExtendedModel = Model.extend({
					setName: function(newName){
						this.set('name', 'customSet', {setterForce:true});
					}
				});
				var model = new ExtendedModel();

				model.set('name', 'Yvan');
				chai.assert.equal(model.get('name'), 'customSet')
			});


		});	

	}
});
