define([
	'./events_test',
	'./lifecycle_test',
	'./setter_test',
	'./getter_test',
	'./getterAndSetterSchemaProperties_test',
	'./helpers_test'
], function (events, lifecycle, setter, getter, getterAndSetterSchemaProperties, helpers) {
	'use strict';

	return function(){
		events();
		lifecycle();
		setter();
		getter();
		getterAndSetterSchemaProperties();
		helpers();
	};
});
