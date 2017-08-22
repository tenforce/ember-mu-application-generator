import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mu-application-generator-welcome-page', 'Integration | Component | mu application generator welcome page', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mu-application-generator-welcome-page}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mu-application-generator-welcome-page}}
      template block text
    {{/mu-application-generator-welcome-page}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
