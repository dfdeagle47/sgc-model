define([
    '../../Utils/utils'
], function(
    utils
) {
    'use strict';
    
    function cutTrigger(trigger) {
        var res = {};
        var mPath = trigger.replace('change:', '');
        res.submodelName = mPath.split('.')[0];
        res.subTrigger = 'change:' + mPath.replace(res.submodelName + '.', '');
        return res;
    }

    return function() {
        return {

            __isMpathTrigger: function(trigger) {
                return _.isString(trigger) && utils.contains(trigger, '.') && utils.startsWith(trigger, 'change:');
            },

            on: function(trigger, callback, context) {
                if (this.__isMpathTrigger(trigger)) {
                    var newTrigger = cutTrigger(trigger);
                    var subModel = this.get(newTrigger.submodelName);
                    if (subModel instanceof Backbone.Model) {
                        subModel.on(newTrigger.subTrigger, callback, context);
                        return;
                    } else {
                        throw new Error('Unknow model');
                    }
                }
                return Backbone.Model.prototype.on.apply(this, arguments);
            },

            off: function(trigger, callback, context) {
                if (_.isString(trigger) && utils.contains('.', trigger) && utils.startsWith(trigger, 'change:')) {
                    var newTrigger = cutTrigger(trigger);
                    var subModel = this.get(newTrigger.submodelName);
                    if (subModel instanceof Backbone.Model) {
                        subModel.off(newTrigger.subTrigger, callback, context);
                        return;
                    } else {
                        throw new Error('Unknow model');
                    }
                }
                return Backbone.Model.prototype.off.apply(this, arguments);
            }
        };
    };
});