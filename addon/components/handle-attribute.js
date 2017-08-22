import Ember from 'ember';
import layout from '../templates/components/handle-attribute';

/*
  This component displays and edits attributes (except string-set, lang-string-set).
  The tagname is configurable, the default is a div, because otherwise we cannot use classNameBindings.
  The classes are configurable, the default is "".
*/
export default Ember.Component.extend({
  layout: layout,
  tagName: "div",
  classNameBindings: ['classes'],
  classes: "",

  isImage: Ember.computed('model', 'attribute', function() {
    let attribute = this.get('attribute');
    let regExp = /(\.png)|(\.svg)|(\.jpg)|(\.gif)|(\.tif)|(\.bmp)$/;
    if (this.get('model') != null) {
      attribute = this.get("model." + attribute);
    }
    return regExp.test(attribute);
  })
});
