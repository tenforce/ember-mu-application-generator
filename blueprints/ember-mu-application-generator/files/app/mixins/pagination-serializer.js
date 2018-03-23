import Mixin from '@ember/object/mixin';

/**
  This mixin is for serializing pagination meta information out of the json api response.

  This code is from ember-data-table's pagination-serializer:
  https://github.com/mu-semtech/ember-data-table/blob/master/addon/mixins/serializer.js
*/
export default Mixin.create({
  /**
      Parse the links in the JSONAPI response and convert to a meta-object
  */
  normalizeQueryResponse(store, clazz, payload) {
    const result = this._super(...arguments);
    result.meta = result.meta || {};

    if (payload.links) {
      result.meta.pagination = this.createPageMeta(payload.links);
    }
    if (payload.meta) {
      result.meta.count = payload.meta.count;
    }

    return result;
  },

  /**
     Transforms link URLs to objects containing metadata
     E.g.
     {
         previous: '/streets?page[number]=1&page[size]=10&sort=name
         next: '/streets?page[number]=3&page[size]=10&sort=name
     }
     will be converted to
     {
         previous: { number: 1, size: 10 },
         next: { number: 3, size: 10 }
     }
   */
  createPageMeta(data) {
    let meta = {};

    Object.keys(data).forEach(type => {
      const link = data[type];
      meta[type] = {};

      let a = document.createElement('a');
      a.href = link;
      let query = a.search.slice(1);

      query.split('&').forEach(pairs => {
        const [param, value] = pairs.split('=');

        if (param === 'page[number]') {
          meta[type].number = parseInt(value);
        } else if (param === 'page[size]') {
          meta[type].size = parseInt(value);
        }

      });
      a = null;
    });

    return meta;
  }
});
