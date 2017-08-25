import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model() {
    return this.get('store').createRecord('<%= entityName %>');
  },
  actions: {
    save(model) {
      var self = this;
      return model.save().then( function() {
        self.transitionTo( "<%= entitiesName %>");
      }).catch( function() {
        alert("Creation of <%= entityName %> failed");
      });
    },
    cancel(model) {
      var self = this;
      model.rollbackAttributes();
      return model.save().then( function() {
        self.transitionTo( "<%= entitiesName %>");
      }).catch( function() {
        alert("Cancelling creation of <%= entityName %> failed");
      });
    }
  }
});
