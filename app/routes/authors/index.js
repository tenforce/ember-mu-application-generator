import Ember from 'ember';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default Ember.Route.extend(DataTableRouteMixin, {
  modelName: 'author',
  queryParams: {
    'book': {refreshModel: true},
  },
		mergeQueryOptions: function(params) {
    var mergedParams = {};
if (! Ember.isEmpty(params['book'])) { 
    mergedParams['filter[book][id]'] = params['book'];
}   
    return mergedParams;
  },
 // see https://guides.emberjs.com/v2.10.0/routing/query-params/#toc_sticky-query-param-values
 // sticky query params for relationships are undesirable at the moment	
 resetController(controller, isExiting, transition) {
    if (isExiting) {
      // isExiting would be false if only the route's model was changing
     controller.set('page', 0);
    controller.set('book', '');
    }
  }		
});
