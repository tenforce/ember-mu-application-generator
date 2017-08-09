import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model(params) {
    return this.store.find('author', params.id );
  },
  actions: {
    cancel(model) {
      model.rollbackAttributes();
      this.transitionTo("authors.show", model);
    },
    save(model) {
      var self = this;
      model.save().then( function() {
        self.transitionTo("authors.show", model);
      }).catch( function() {
        alert("Could not save author");
      });
    },
    delete(model) {
      var self = this;
      model.deleteRecord();
      return model.save().then( function() {
        self.transitionTo( "authors");
      }).catch( function() {
        model.rollbackAttributes();
        alert("Deletion of author failed");
      });
    }
  }
});
