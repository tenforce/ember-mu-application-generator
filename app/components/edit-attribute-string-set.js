import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "div",
  classNameBindings: ['classes'],
  classes: "",

  actions: {
    changeStringSetElement(index, value) {
      var strings = this.get("model." + this.get('attribute'));
      strings[index] = value;
    },
    deleteLabel(index) {
      var strings = this.get("model." + this.get('attribute'));
      strings.removeAt(index);
    },
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
