import Ember from 'ember';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default Ember.Route.extend(DataTableRouteMixin, {
  modelName: 'book',
  queryParams: {

  },
  store: Ember.inject.service(),
  model(params) {
    return this.store.find('book', params.id );
  }
});
