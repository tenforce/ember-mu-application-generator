import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model() {
    return this.get('store').findAll('author');
  },

  // modelName: 'author',
  queryParams: {
    
  },

  mergeQueryOptions: function(params) {
    var mergedParams = {};
    
    return mergedParams;
  },

  // see https: //guides.emberjs.com/v2.10.0/routing/query-params/#toc_sticky-query-param-values
  // sticky query params
  // for relationships are undesirable at the moment

  resetController(controller, isExiting, transition) {
    if (isExiting) {
      // isExiting would be false if only the route's model was changing
      controller.set('page', 0);
      
    }
  }
});
