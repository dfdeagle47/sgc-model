define([
	'./events_test',
	'./lifecycle_test',
	'./setter_test',
	'./getter_test',
	'./getterAndSetterSchemaProperties_test',
	'./helpers_test',
	'./extend_test'
], function (
	events, 
	lifecycle, 
	setter, 
	getter, 
	getterAndSetterSchemaProperties, 
	helpers,
	extend
	) {
	'use strict';

	return function(){
		events();
		lifecycle();
		setter();
		getter();
		getterAndSetterSchemaProperties();
		helpers();
		extend();
	};
});
