import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  // A string representation of this model, based on its attributes.
  // This is what mu-cl-resources uses to search on, and how the model will be presented while editing relationships.
  // TODO what if there are no attributes?
  stringRep: Ember.computed.collect.apply(this,['title', 'isbn','id']),

  title: attr('string'),
  isbn: attr('string'),
  authors: hasMany('author', {inverse: 'books'})
});
