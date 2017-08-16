import Ember from 'ember';

export default Ember.Route.extend({
  size: 20,
  page: 0,
  queryParams: {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    },
  },
  store: Ember.inject.service(),
  model(params) {
    let page = params.page;
    let size = params.size;
    if(size == null) {
      size = this.get('size');
    }
    if(page == null) {
      page = this.get('page');
    }

    const options = {
      page: {
        number: page,
        size: size
      }
    };

    return this.get('store').query('<%= entityName %>', options);
  }
});
