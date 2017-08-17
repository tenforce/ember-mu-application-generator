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
    sort: {
      refreshModel: true
    }
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

    if(params.sort != null) {
      options['sort'] = params.sort;
    }

    return this.get('store').query('book', options);
  }
});
