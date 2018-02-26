import { set } from '@ember/object';
import Ember from 'ember';

export default Ember.Route.extend({
  showError: false,

  actions: {
    toggleShowError(error) {
      set(error, 'showError', !error.showError);
    }
  }
});
