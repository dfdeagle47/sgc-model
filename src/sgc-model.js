define([
	'./SagaCollection/Collection',
	'./SagaModel/Model',
	'./Utils/utils',
	'./prototype/extend-prototype'
], function (
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