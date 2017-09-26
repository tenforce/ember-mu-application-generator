import Ember from 'ember';
import layout from '../templates/components/handle-attribute';

/*
  This component displays and edits dates.
  The tagname is configurable, the default is a div, because otherwise we cannot use classNameBindings.
  The classes are configurable, the default is "".

  timePicker - show timepicker or not, the default is false
  timeSteps - interval of minute stepts in the timePicker, default is 5
*/
export default Ember.Component.extend({
  layout: layout,
  tagName: "div",
  classNameBindings: ['classes'],
  classes: "",
  timePicker: false,
  timeSteps: 5
});