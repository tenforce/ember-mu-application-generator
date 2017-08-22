import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-belongs-to', 'Integration | Component | edit belongs to', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edit-belongs-to}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#edit-belongs-to}}
      template block text
    {{/edit-belongs-to}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
