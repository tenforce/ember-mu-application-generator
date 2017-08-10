<%= importStatements %>

export default Model.extend({
  // A string representation of this model, based on its attributes.
  // This is what mu-cl-resources uses to search on, and how the model will be presented while editing relationships.
  // TODO what if there's no attributes?
  stringRep: Ember.computed.collect.apply(this,[<%="'" + attributes.map( function(attribute) {return attribute.name}).join("', '") + "'"%>]),

  <%= attrs %>
});
