define([
	'sgc-model',
	'chai',
	'../test/collection_test/collection_test',
	'../test/model_test/model_test',

	'mocha'
], function (SGCModel, chai, collection, model) {
	'use strict';

	var mocha = window.mocha;

	mocha.setup('bdd');

	collection();
	model();

	if (window.mochaPhantomJS) {
		window.mochaPhantomJS.run();
	}
	else {
		mocha.run();
	}
});
