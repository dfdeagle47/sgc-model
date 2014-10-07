define([
	'SGCModel',
	'chai'
], function (SGCModel, chai) {
	'use strict';

	return function(){


		chai.should();
		var Model = SGCModel.Model;

		//Events
		describe('Testing SGCModel Events', function () {

			beforeEach(function(){
				delete window.SGClasses;
			});

			it('Test simple naming function', function(){
				var newModel = Model.extend({}, {}, 'MyClazz');

				var saveModel = window.getClass('MyClazz');

				saveModel.should.equal(newModel);
			});

			it('Test simple naming function with no class methods', function(){
				var newModel = Model.extend({}, 'MyClazz1');
				var saveModel = window.getClass('MyClazz1');
				saveModel.should.equal(newModel);
			});

			it('Test super model and submodel naming', function(){
				var SUPERMODEL = Model.extend({}, {}, 'SUPERMODEL');
				var SUBMODEL = SUPERMODEL.extend({}, {}, 'SUBMODEL');

				window.getClass('SUPERMODEL').should.equal(SUPERMODEL);
				window.getClass('SUBMODEL').should.equal(SUBMODEL);
			});

			it('Test model naming two times', function(){
				Model.extend({}, {}, 'SUPERMODEL1');
				chai.expect(function(){
					Model.extend({}, {}, 'SUPERMODEL1');	
				}).to['throw'](Error);
			});

		});	
	};
});
