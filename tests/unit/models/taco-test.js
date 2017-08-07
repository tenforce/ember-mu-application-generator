import { moduleForModel, test } from 'ember-qunit';

moduleForModel('taco', 'Unit | Model | taco', {
  // Specify the other units that are required for this test.
  needs: ['model:protein', 'model:topping']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
