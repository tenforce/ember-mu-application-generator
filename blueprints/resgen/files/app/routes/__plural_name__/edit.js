import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model(params) {
    return this.store.find('<%= entityName %>', params.id );
  },
  actions: {
    cancel(changeset, model) {
      changeset.rollback();
      this.transitionTo("<%= entitiesName %>.show", model);
    },
    save(changeset, model) {
      var self = this;
      changeset.save().then( function() {
        self.transitionTo("<%= entitiesName %>.show", model);
      }).catch( function() {
        alert("Could not save <%= entityName %>");
      });
    },
    delete(changeset, model) {
      var self = this;
      model.deleteRecord();
      return model.save().then( function() {
        self.transitionTo( "<%= entitiesName %>");
      }).catch( function() {
        model.rollbackAttributes();
        alert("Deletion of <%= entityName %> failed");
      });
    }
  }
});
