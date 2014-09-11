define([
	'sgc-model',
	'chai',
], function (SGCModel, chai) {
	'use strict';

	return function(){
		var expect = chai.expect;

		var Model = SGCModel.Model;

		describe('Testing automatic getter/Setter generator', function () {

			it('Testing automatic getter', function(done){
				var ExtenderModel = Model.extend({
					constructor: function(){
						var res = Model.prototype.constructor.apply(this, arguments);
						this._generateGetSetForAttribute('customAttr');
						return res;
					},

					get: function(attribute){
						if (attribute === 'customAttr') {
							done();
						};
						return Model.prototype.get.apply(this, arguments);
					}
				})
				var model = new ExtenderModel();
				model.customAttr;
			});

			it('Testing automatic getter with overided getter', function(done){
				var ExtenderModel = Model.extend({
					constructor: function(){
						var res = Model.prototype.constructor.apply(this, arguments);
						this._generateGetSetForAttribute('customAttr');
						return res;
					},

					getCustomAttr: function(){
						done();
					}
				})
				var model = new ExtenderModel();
				model.customAttr;
			});

			it('Testing automatic setter', function(done){
				var ExtenderModel = Model.extend({
					constructor: function(){
						var res = Model.prototype.constructor.apply(this, arguments);
						this._generateGetSetForAttribute('customAttr');
						return res;
					},

					set: function(attribute){
						if (attribute === 'customAttr') {
							done();
						};
						return Model.prototype.set.apply(this, arguments);
					}
				})
				var model = new ExtenderModel();
				model.customAttr = 0;
			});

			it('Testing automatic setter with overided setter', function(done){
				var ExtenderModel = Model.extend({
					constructor: function(){
						var res = Model.prototype.constructor.apply(this, arguments);
						this._generateGetSetForAttribute('customAttr');
						return res;
					},

					setCustomAttr: function(){
						done();
					}
				})
				var model = new ExtenderModel();
				model.customAttr = 0;
			});

			it('Testing full loop (automatic set and get automatic)', function(){
				var ExtenderModel = Model.extend({
					constructor: function(){
						var res = Model.prototype.constructor.apply(this, arguments);
						this._generateGetSetForAttribute('customAttr');
						return res;
					},
				})
				var model = new ExtenderModel();
				
				model.customAttr = 4;
				chai.assert.equal(model.customAttr, 4)
			});
		});	


	}
});
