define([
	'./prototype/extend-prototype',
	'./SagaCollection/Collection',
	'./SagaModel/Model',
	'./Utils/utils'
	
], function (
	backbonePrototype,
	Collection,
	Model,
	utils
	) {
	'use strict';
	
	return {
		Collection: Collection,
		Model: Model,
		utils:utils

	};


});