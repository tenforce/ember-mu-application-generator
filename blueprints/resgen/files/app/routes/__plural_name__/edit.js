import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model(params) {
    return this.store.find('<%= entityName %>', params.id );
  },
  actions: {
    cancel(model) {
      model.rollbackAttributes();
      this.transitionTo("<%= entitiesName %>.show", model);
    },
    save(model) {
      var self = this;
      model.save().then( function() {
        self.transitionTo("<%= entitiesName %>.show", model);
      }).catch( function() {
        alert("Could not save <%= entityName %>");
      });
    },
    delete(model) {
      var self = this;
      model.deleteRecord();
      return model.save().then( function(model) {
        self.transitionTo( "<%= entitiesName %>");
      }).catch( function() {
        model.rollbackAttributes();
        alert("Deletion of <%= entityName %> failed");
      });
    }
  }
});
