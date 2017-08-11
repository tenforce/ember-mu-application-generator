import Ember from 'ember';

/*
  This component let you edit booleans.
  The tagname is configurable, the default is a div, because otherwise we cannot use classNameBindings.
  The classes are configurable, the default is "".
*/
export default Ember.Component.extend({
  tagName: "div",
  classNameBindings: ['classes'],
  classes: ""
});
