import Ember from 'ember';

/*
  This component displays and edits attributes (except string-set, lang-string-set and boolean).
  The tagname is configurable, the default is a div, because otherwise we cannot use classNameBindings.
  The classes are configurable, the default is "".
*/
export default Ember.Component.extend({
  tagName: "div",
  classNameBindings: ['classes'],
  classes: ""
});
