import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model(params) {
    return this.store.find('<%= entityName %>', params.id );
  },
  actions: {
    delete(model) {
      var self = this;
      model.deleteRecord();
      return model.save().then( function(model) {
        self.transitionTo( "<%= entitiesName %>");
      }).catch( function() {
        model.rollbackAttributes();
        alert("Deletion of <%= entityName %> failed");
      });
    },
    backToList () {
      this.transitionTo("<%= entitiesName %>");
    }
  }
});
