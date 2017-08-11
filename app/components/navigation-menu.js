import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  /*
    This component assumes, that the routes were only created by this addon.
  */
  menus: Ember.computed(function(){
    let router = Ember.getOwner(this).lookup('router:main');
    let allRoutesList = router.get('router.recognizer.names');
    let routeKeys = Object.keys(allRoutesList);
    let filteredKeys = routeKeys.filter(function(item){
      return item.indexOf('.index') >= 0;
    });

    filteredKeys = filteredKeys.map(function(item){
      return item.split('.index')[0];
    });
    return filteredKeys.uniq();
  })
});
