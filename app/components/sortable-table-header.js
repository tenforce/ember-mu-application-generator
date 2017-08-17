import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'th',
  classNameBindings: ['classes', 'sortableClass', 'order', 'isSorted:sorted'],
  classes: "properties__label",
  sortableClass: "sortable",
  currentSort: "",

  dasherizerized: Ember.computed('attribute', function() {
    return Ember.String.dasherize(this.get('attribute'));
  }),
  inverseDasherizerized: Ember.computed('dasherizerized', function() {
    return "-" + this.get('dasherizerized');
  }),

  isSorted: Ember.computed('order', function() {
    return (this.get('order') !== null) && (this.get('order').length > 0);
  }),
  order: Ember.computed('currentSort', function() {
    var currentSort = this.get('currentSort');
    if (currentSort === this.get('dasherizerized')) {
      return "asc";
    }
    if (currentSort === this.get('inverseDasherizerized')) {
      return "desc";
    }
    return "";
  }),
  actions: {
    /**
       Sets the current sorting parameter.
       Note: the current sorting parameter may contain another field than the given field.
       In case the given field is currently sorted ascending, change to descending.
       In case the given field is currently sorted descending, clean the sorting.
       Else, set the sorting to ascending on the given field.
     */
    inverseSorting() {
      if (this.get('order') === 'asc') {
        this.set('currentSort', this.get('inverseDasherizerized'));
      } else if (this.get('order') === 'desc') {
        this.set('currentSort', '');
      } else { // if currentSorting is not set to this field
        this.set('currentSort', this.get('dasherizerized'));
      }
    }
  }
});
