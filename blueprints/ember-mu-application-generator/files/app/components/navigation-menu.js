import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Component from '@ember/component';
import layout from '../templates/components/navigation-menu';

/*
  This component created a menu for your routes.
  This component assumes, that the routes were only created by this addon.

  The function, that generates the menu list gets all the route names with a lookup,
  then filters the keys with ".index", as that is always part of the resource, this blueprint generates,
  and takes the strings in front of the ".index".

  The list of indeces are always unique and sorted.
*/
export default Component.extend({
  layout: layout,
  tagName: 'div',
  currentRoute: '',

  menus: computed(function() {
    const routeKeys = [
      /* Add routes for the menu here */
    ];
    return routeKeys.uniq().sort();
  }),

  actions: {
    goToPage: function(item) {
      this.set('currentRoute', item);
      this.get("routing").transitionTo(item);
    }
  }
});
