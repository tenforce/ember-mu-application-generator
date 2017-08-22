import Ember from 'ember';
import layout from '../templates/components/edit-attribute-string-set';

/*
  This component edit string-sets.
  The tagname is configurable, the default is a div, because otherwise we cannot use classNameBindings.
  The classes are configurable, the default is "".
*/
export default Ember.Component.extend({
  layout: layout,
  tagName: "div",
  classNameBindings: ['classes'],
  classes: "",

  actions: {
    /*
      This function edits a certain indexed element in the string-set,
      as those are not objects, and cannot be edited inside the model otherwise.
    */
    changeStringSetElement(index, value) {
      var strings = this.get("model." + this.get('attribute'));
      strings[index] = value;
    },
    /*
      This function deletes a certain indexed element in the string-set,
      as those are not objects, and cannot be deleted inside the model otherwise.
    */
    deleteLabel(index) {
      var strings = this.get("model." + this.get('attribute'));
      strings.removeAt(index);
    },

    /*
      This function creates a new element in the string-set.
      If it doesn't exists yet, it creates an empty array and puts a new element in it.
    */
    createLabel() {
      if ((this.get("model." + this.get('attribute'))) == null) {
        this.set("model." + this.get('attribute'), []);
      }
      var strings = this.get("model." + this.get('attribute'));

      if (this.get("lang")) {
        strings.pushObject({
          content: "",
          language: ""
        });
      } else {
        strings.pushObject("")
      }
    }
  }
});
