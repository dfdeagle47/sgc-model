require.config({
	deps: ['sgc-model', 'test'],
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},
		'sgc-model': {
			deps: ['backbone']
		}
	},
	paths: {
		jquery: '../bower_components/jquery/dist/jquery.min',
		backbone: '../bower_components/backbone/backbone',
		underscore: '../bower_components/underscore/underscore',

		mocha: '../node_modules/mocha/mocha',
		chai: '../node_modules/chai/chai',

		'sgc-model': '../src/sgc-model',

		'test': '../test/test'
	},
	baseUrl: '../src'
});