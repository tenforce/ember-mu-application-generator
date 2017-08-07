import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('author');
  },
  actions: {
    cancel(model) {
      model.rollbackAttributes();
      this.transitionTo("author", model);
    },
    save(model) {
      var self = this;
      model.save().then( function() {
        self.transitionTo("author", model);
      }).catch( function() {
        alert("Could not save author");
      });
    }
  }
});
