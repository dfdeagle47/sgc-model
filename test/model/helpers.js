define([
	'sgc-model',
	'chai',
], function (SGCModel, chai) {
	'use strict';

	return function(){
		var expect = chai.expect;

		var Model = SGCModel.Model;
		// var Collection = SGCModel.Collection;

		describe('Testing helpers Model', function () {

			it('querying model with empty query ', function () {
				var model = new Model({name:"francois", departemnt:"sagacify", type:"coo"});
				model.query({});
			});

			it('querying model correct functions ', function () {
				var model = new Model({name:"francois", departemnt:"sagacify", type:"coo"});
				chai.assert.equal(model.query({type:function(value){
					return value.startsWith('c');
				}}), true);
			});

			it('querying model unrecheable functions', function () {
				var model = new Model({name:"francois", departemnt:"sagacify", type:"coo"});
				chai.assert.equal(model.query({type:function(value){
					return value.startsWith('XYZ');
				}}), false);
			});

			it('querying false complexe query ', function () {
				var model = new Model({name:"francois", departemnt:"sagacify", type:"coo"});

				var query = {
					name:'francis',
					'type':function(value){
							return value.startsWith('c');
					}
				};
				chai.assert.equal(model.query(query), false);
			});

			it('querying true complexe query ', function () {
				var model = new Model({name:"francois", departemnt:"sagacify", type:"coo"});

				var query = {
					name:'francois',
					'type':function(value){
							return value.startsWith('c');
					}
				};
				chai.assert.equal(model.query(query), true);
			});

		});	
	}
});
