import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model(params) {
    return this.store.find('author', params.id );
  },
  actions: {
    cancel(changeset, model) {
      changeset.rollback();
      this.transitionTo("authors.show", model);
    },
    save(changeset, model) {
      var self = this;
      changeset.save().then( function() {
        self.transitionTo("authors.show", model);
      }).catch( function() {
        alert("Could not save author");
      });
    },
    delete(changeset, model) {
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
