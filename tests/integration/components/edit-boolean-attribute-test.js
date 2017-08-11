import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-boolean-attribute', 'Integration | Component | edit boolean attribute', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edit-boolean-attribute}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#edit-boolean-attribute}}
      template block text
    {{/edit-boolean-attribute}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
