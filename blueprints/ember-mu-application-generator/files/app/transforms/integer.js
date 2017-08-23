// import Ember from 'ember';
import Transform from 'ember-data/transform';

// This is basically an number, so this is taken from the Ember Data Number transfrom
//  https://github.com/emberjs/data/blob/master/addon/transforms/number.js

const empty = Ember.isEmpty;
function isNumber(value) {
  return value === value && value !== Infinity && value !== -Infinity;
}

const IntegerTransform = Transform.extend({
  deserialize(serialized) {
    let transformed;

    if (empty(serialized)) {
      return null;
    } else {
      transformed = Number(serialized);

      return isNumber(transformed) ? transformed : null;
    }
  },

  serialize(deserialized) {
    let transformed;

    if (empty(deserialized)) {
      return null;
    } else {
      transformed = Number(deserialized);

      return isNumber(transformed) ? transformed : null;
    }
  }
});

export default IntegerTransform;
