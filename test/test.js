define([
	'sgc-model',
	'chai',
	'../test/collection/collection',
	'../test/model/model',

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
