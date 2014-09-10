define([
	'sgc-model',
	'chai',
	'mocha'
], function (SGCModel, chai) {
	'use strict';

	var expect = chai.expect;
	var mocha = window.mocha;

	mocha.setup('bdd');

	var Collection = SGCModel.Collection;
	var Model = SGCModel.Model;

	describe('Testing the SGCModel module.', function () {

		it('Creating a Model instance', function () {
			var model = new Model();
			expect(model).to.be.an.instanceof(Model);
		});

		it('Creating a Collection instance', function () {
			var collection = new Collection();
			expect(collection).to.be.an.instanceof(Collection);
		});

	});

	mocha.run();
});