import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model() {
    return this.get('store').createRecord('author');
  },
  actions: {
    save(model) {
      var self = this;
      return model.save().then( function(model) {
        self.transitionTo( "authors");
      }).catch( function() {
        alert("Creation of author failed");
      });
    },
    cancel(model) {
      var self = this;
      model.rollbackAttributes();
      return model.save().then( function(model) {
        self.transitionTo( "authors");
      }).catch( function() {
        alert("Cancelling creation of author failed");
      });
    }
  }
});
