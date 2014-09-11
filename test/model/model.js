define([
	'./events',
	'./lifecycle',
	'./setter',
	'./getter',
	'./getterAndSetterSchemaProperties',
	'./helpers',
], function (events, lifecycle, setter, getter, getterAndSetterSchemaProperties, helpers) {
	'use strict';

	return function(){
		events();
		lifecycle();
		setter();
		getter();
		getterAndSetterSchemaProperties();
		helpers();
	}
});
