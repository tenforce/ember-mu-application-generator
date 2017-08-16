import Ember from 'ember';
import PaginationSerializerMixin from 'ember-mu-application-generator/mixins/pagination-serializer';
import { module, test } from 'qunit';

module('Unit | Mixin | pagination serializer');

// Replace this with your real tests.
test('it works', function(assert) {
  let PaginationSerializerObject = Ember.Object.extend(PaginationSerializerMixin);
  let subject = PaginationSerializerObject.create();
  assert.ok(subject);
});
