import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('book');
  },
  actions: {
    cancel(model) {
      model.rollbackAttributes();
      this.transitionTo("book", model);
    },
    save(model) {
      var self = this;
      model.save().then( function() {
        self.transitionTo("book", model);
      }).catch( function() {
        alert("Could not save book");
      });
    }
  }
});
