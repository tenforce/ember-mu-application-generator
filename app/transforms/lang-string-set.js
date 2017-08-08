/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';
import Transform from 'ember-data/transform';

const LangStringSet = Transform.extend({
  // TODO : fix this when mu-cl-resources (or virtuoso?) has been patched
  deserialize(serialized) {
    if (serialized && (Ember.typeOf(serialized) === 'array')) {
      const arr = serialized.map(o => Ember.Object.create(o));
      // the \n we're being send back by mu-cl-resources is not interpreted as a line feed so we have to force it
      arr.forEach(item => item['content'] = item['content'].split('\\n').join('\n'));
      return arr;
    } else {
      return console.log("lang string set should be an array");
    }
  },
  serialize(deserialized) {
    return deserialized;
  }
});

export default LangStringSet;
