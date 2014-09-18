require.config({
	deps: ['SGCModel', 'test'],
	shim: {
		jquery: {
			exports: '$'
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},

		'SGCModel': {
			deps: ['backbone']
		}
	},
	paths: {
		'jquery': '../bower_components/jquery/dist/jquery.min',
		'backbone': '../bower_components/backbone/backbone',
		'underscore': '../bower_components/underscore/underscore',

		'mocha': '../node_modules/mocha/mocha',
		'chai': '../node_modules/chai/chai',

		'SGCModel': '../src/sgc-model',
		// 'sgc-model': '../dist/sgc-model.min',

		// 'component': '../src/',

		'test': '../test/test'
	},
	baseUrl: '../src'
});
