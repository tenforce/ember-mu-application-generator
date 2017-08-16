import Ember from 'ember';
import layout from '../templates/components/display-model-hasmany-relationship';

export default Ember.Component.extend({
    routing: Ember.inject.service('-routing'),
		layout: layout,
		tagName:'dd',
		classNames: ['properties__data'],
});
