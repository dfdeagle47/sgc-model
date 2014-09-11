define([
	], function () {
	'use strict';

	return function (/*SagaModel*/) {

		return {
			query: function(attrs){
				if (!attrs) {
					return undefined;
				}
		        for (var key in attrs) {
		        	if (_.isFunction(attrs[key])) {
		        		if (!attrs[key](this.get(key))) {
		        			return false;
		        		}
		        	} else {
		        		if (attrs[key] !== this.get(key)) {
		        			return false;
		        		}
		        	}
		        }
		        return true;
			}
		};

	};

});
