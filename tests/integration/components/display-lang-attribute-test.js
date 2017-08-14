import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('display-lang-attribute', 'Integration | Component | display lang attribute', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{display-lang-attribute}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#display-lang-attribute}}
      template block text
    {{/display-lang-attribute}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
