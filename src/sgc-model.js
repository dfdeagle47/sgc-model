define([
	'./SagaCollection/Collection',
	'./SagaModel/Model',
	'./Utils/utils',
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