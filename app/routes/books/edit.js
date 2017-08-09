import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model(params) {
    return this.store.find('book', params.id );
  },
  actions: {
    cancel(model) {
      model.rollbackAttributes();
      this.transitionTo("books.show", model);
    },
    save(model) {
      var self = this;
      model.save().then( function() {
        self.transitionTo("books.show", model);
      }).catch( function() {
        alert("Could not save book");
      });
    },
    delete(model) {
      var self = this;
      model.deleteRecord();
      return model.save().then( function() {
        self.transitionTo( "books");
      }).catch( function() {
        model.rollbackAttributes();
        alert("Deletion of book failed");
      });
    }
  }
});
