import DS from 'ember-data';

export default DS.Model.extend({
  filling: DS.belongsTo('protein'),
  toppings: DS.hasMany('topping'),
  name: DS.attr('string'),
  price: DS.attr('number'),
  misc: DS.attr()
});
