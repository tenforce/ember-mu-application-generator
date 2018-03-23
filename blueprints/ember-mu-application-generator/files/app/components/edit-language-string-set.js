import { copy } from '@ember/object/internals';
import { isNone } from '@ember/utils';
import Component from '@ember/component';
import { LangString } from 'ember-mu-transform-helpers/transforms/language-string';

/*
  This component edit string-sets.
  The tagname is configurable, the default is a div, because otherwise we cannot use classNameBindings.
  The classes are configurable, the default is "".
*/
export default Component.extend({
  tagName: "div",
  classNameBindings: ['classes'],
  classes: "",

  init() {
    this._super(...arguments);
    const strings = this.get("data");
    var newStrings = isNone(strings) ? [] : copy(strings, true);
    this.set("view", newStrings);
  },

  actions: {
    changeLangStringSetContent(index, value) {
      const strings = this.get("data");
      var newStrings = copy(strings, true);
      newStrings[index].content = value;
      this.set("data", newStrings);
    },

    changeLangStringSetLang(index, value) {
      const strings = this.get("data");
      var newStrings = copy(strings, true);
      newStrings[index].language = value;
      this.set("data", newStrings);
    },

    deleteLabel(index) {
      const strings = this.get("data");
      var newStrings = copy(strings, true);
      newStrings.removeAt(index);
      this.set("data", newStrings);
      this.get("view").removeAt(index);
    },

    /*
      This action creates a new element in the string-set.
      If it doesn't exists yet, it creates an empty array and puts a new element in it.
    */
    createLabel() {
      const strings = this.get("data");
      var newStrings = isNone(strings) ? [] : copy(strings, true);

      var newLabel = new LangString("","");

      newStrings.push(newLabel);
      this.set("data", newStrings);
      this.get("view").pushObject(newLabel);
    }
  }
});
