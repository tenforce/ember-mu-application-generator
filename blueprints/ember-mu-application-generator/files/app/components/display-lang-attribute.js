import Component from '@ember/component';
import layout from '../templates/components/display-lang-attribute';

/*
  This component displays string-sets.
  The tagname is configurable, the default is a div, because otherwise we cannot use classNameBindings.
  The classes are configurable, the default is "".
*/
export default Component.extend({
  layout: layout,
  tagName: "div",
  classNameBindings: ['classes'],
  classes: ""
});
