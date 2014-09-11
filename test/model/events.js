define([
	'sgc-model',
	'chai',
], function (SGCModel, chai) {
	'use strict';

	return function(){
		var expect = chai.expect;

		var Model = SGCModel.Model;

		//Events
		describe('Testing SGCModel Events', function () {
			
			it('test m path assert with correct mpath (change:name)', function () {
				var model = new Model();
				var trigger = 'change:submodel.name';
				chai.assert.equal(model.__isMpathTrigger(trigger), true)
			});

			it('test m path assert with not mpath (change:name)', function () {
				var model = new Model();
				var trigger = 'change:name';
				chai.assert.equal(model.__isMpathTrigger(trigger), false)
			});

			it('test m path assert with not mpath (chanXYZge:name)', function () {
				var model = new Model();
				var trigger = 'chanXYZge:name';
				chai.assert.equal(model.__isMpathTrigger(trigger), false)
			});

			it('register for mpath 1 "." event (change:submodel.name)', function (done) {
				var model = new Model();
				var submodel = new Model();
				submodel.set('name', 'Yvan');

				model.set('submodel', submodel);

				model.on('change:submodel.name', function(){
					done();
				});
				submodel.set('name', 'Kevin');
			});

			it('register for unknow sub model event (change:submodel.name)', function () {
				chai.expect(function(){
					var model = new Model();
					model.on('change:submodel.name', function(){});	
				}).to.throw(Error);	
			});

			it('register for mpath 2 "." event (change:submodel.subsubmodel.name)', function (done) {
				var model = new Model();
				var submodel = new Model();
				var subsubmodel = new Model();

				subsubmodel.set('name', 'Yvan');
				
				model.set('submodel', submodel);
				submodel.set('subsubmodel', subsubmodel);
				
				model.on('change:submodel.subsubmodel.name', function(){
					done();
				});

				subsubmodel.set('name', 'Kevin');
			});

			it('unregister for mpath 1 "." event', function () {
				var model = new Model();
				var submodel = new Model();
				submodel.set('name', 'Yvan');

				model.set('submodel', submodel);

				model.off('change:submodel.name');
			});


		});	

	}
});
