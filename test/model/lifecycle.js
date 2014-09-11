define([
	'sgc-model',
	'chai',
], function (SGCModel, chai) {
	'use strict';

	return function(){
		var expect = chai.expect;

		var Model = SGCModel.Model;

		describe('Testing SGCModel module life cycle .', function () {

			it('Creating a Model instance', function () {
				var model = new Model();
				expect(model).to.be.an.instanceof(Model);
			});
		});	
	}
});
