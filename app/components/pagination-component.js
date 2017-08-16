import Ember from 'ember';

/**
  This code is based on the ember-data-table's number pagonation component
  https://github.com/mu-semtech/ember-data-table/blob/master/addon/components/number-pagination.js
*/
export default Ember.Component.extend({
  currentPage: Ember.computed('page', {
    get() {
      return this.get('page') ? parseInt(this.get('page')) + 1 : 1;
    },
    set(key, value) {
      this.set('page', value - 1);
      return value;
    }
  }),
  firstPage: Ember.computed('links', function() {
    return this.get('links')['first']['number'] || 1;
  }),
  lastPage: Ember.computed('links', function() {
    const max = this.get('links')['last']['number'];
    return max ? max + 1 : max;
  }),
  isFirstPage: Ember.computed('firstPage', 'currentPage', function() {
    return this.get('firstPage') == this.get('currentPage');
  }),
  isLastPage: Ember.computed('lastPage', 'currentPage', function() {
    return this.get('lastPage') == this.get('currentPage');
  }),
  hasMultiplePages: Ember.computed('lastPage', function() {
    return this.get('lastPage') !== undefined;
  }),
  numberOfPages: Ember.computed('firstPage', 'lastPage', function(){
    return this.get('lastPage') - this.get('firstPage') + 1;
  }),
  startItem: Ember.computed('size', 'currentPage', function() {
    return this.get('size') * (this.get('currentPage') - 1) + 1;
  }),
  endItem: Ember.computed('startItem', 'numberOfItems', function() {
    return this.get('startItem') + this.get('numberOfItems') - 1;
  }),
  pageOptions: Ember.computed('firstPage', 'numberOfPages', function() {
    return Array.from(new Array(this.get('numberOfPages')), (val, index) => this.get('firstPage') + index);
  }),
  actions: {
    changePage(link) {
      this.set('page', link['number'] || 0);
    }
  }
});
