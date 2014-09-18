define([
	'sgc-model',
	'chai'
], function (SGCModel, chai) {
	'use strict';

	return function(){
		var expect = chai.expect;
		var assert = chai.assert;
		chai.should();

		var Model = SGCModel.Model;
		var Collection = SGCModel.Collection;

		//Events
		describe('Testing collection helpers ', function () {
			
			it('Test is Empty with items', function () {
				var collection = new Collection();	
				collection.add([{name:'Yvan'}, {name:'Francois'}, {name:'kevin'}]);
				chai.expect(collection.isEmpty()).to.equal(false);
			});

			it('Test is Empty with no items', function () {
				var collection = new Collection();	
				collection.add([{name:'Yvan'}, {name:'Francois'}, {name:'kevin'}]);
				collection.reset([]);
				chai.expect(collection.isEmpty()).to.equal(true);
			});

			it('Test next model (for last item)', function () {
				var collection = new Collection();	
				collection.add([{name:'Yvan'}, {name:'Francois'}, {name:'kevin'}]);
				assert.equal(collection.nextModel(collection.last()), undefined);
			});

			it('Test next model (for first item)', function () {
				var collection = new Collection();	
				collection.add([{name:'Yvan'}, {name:'Francois'}, {name:'kevin'}]);
				assert.equal(collection.nextModel(collection.at(0)), collection.at(1));
			});

			it('Test next model (for unexisting model)', function () {
				var collection = new Collection();	
				collection.add([{name:'Yvan'}, {name:'Francois'}, {name:'kevin'}]);
				var unexistingModel = new Model({name:'bidon'});
				assert.equal(collection.nextModel(unexistingModel), undefined);
			});


			it('Test previous model (for last item)', function () {
				var collection = new Collection();	
				collection.add([{name:'Yvan'}, {name:'Francois'}, {name:'kevin'}]);
				assert.equal(collection.previousModel(collection.last()), collection.at(1));
			});

			it('Test previous model (for first item)', function () {
				var collection = new Collection();	
				collection.add([{name:'Yvan'}, {name:'Francois'}, {name:'kevin'}]);
				assert.equal(collection.previousModel(collection.at(0)), undefined);
			});

			it('Test previous model (for unexisting model)', function () {
				var collection = new Collection();	
				collection.add([{name:'Yvan'}, {name:'Francois'}, {name:'kevin'}]);
				var unexistingModel = new Model({name:'bidon'});
				assert.equal(collection.previousModel(unexistingModel), undefined);
			});


			it('Add strings object', function () {
				var collection = new Collection();	
				var anId = '1';
				var anId1 = '2';
				collection.set([anId, anId1]);

				collection.at(0).id.should.equal(anId);
				collection.at(1).id.should.equal(anId1);				
			});


			it('check remove predicate existing object', function () {
				var collection = new Collection();	
				collection.add([{name:'Yvan'}, {name:'Francois'}, {name:'kevin'}]);
				
				var removed = collection.remove(undefined, {
					predicate: function(model){
						return model.get('name') === 'Yvan';
					}
				});
				collection.length.should.equal(2);
				collection.filter(function(model){
					return model.get('name') === 'Yvan';
				}).should.have.length(0);
				chai.assert.equal(removed.length, 1);
			});


			it('check remove predicate unexisting object', function () {

				var collection = new Collection();	
				collection.add([{name:'Yvan'}, {name:'Francois'}, {name:'kevin'}]);
				
				var removed = collection.remove(undefined, {
					predicate: function(model){
						return model.get('name') === 'Yann';
					}
				});
				collection.length.should.equal(3);
				chai.assert.equal(removed.length, 0);
			});


			it('check where query for empty collection', function () {

				var collection = new Collection();	
				collection.add([{name:'Yvan'}, {name:'Francois'}, {name:'kevin'}]);
				collection.where({});
			});

			// it('check collection clone', function () {

			// 	var collection = new Collection();	
			// 	collection.add([{name:'Yvan'}, {name:'Francois'}, {name:'kevin'}], {url:'bidon', parent:'xyz'});
			// 	debugger
			// 	collection.addSGSort('name', 'asc');
			// 	collection.addSGFilter('name', true);

			// 	expect(collection.clone()).to.be.an['instanceof'](Collection);
			// 	expect(collection.clone()).to.be.an['instanceof'](collection.constructor);
			// 	expect(collection.clone().length).to.equal(3);
			// 	expect(collection.clone().url).to.equal(collection.url);
			// 	expect(collection.clone().parent).to.equal(collection.parent);

			// 	expect(collection.clone().parent).to.equal(collection.parent);
			// 	expect(_.isEqual(collection.clone().getSGSort(), collection.getSGSort())).to.equal(true);
			// 	expect(_.isEqual(collection.clone().getSGFilter(), collection.getSGFilter())).to.equal(true);
			// 	expect(_.isEqual(collection.clone().getSGPaginate(), collection.getSGPaginate())).to.equal(true);

			// });
		});	
	};
});
