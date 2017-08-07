import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('authors', function() {
    this.route('new');

    this.route('show', {
      path: ':id'
    });

    this.route('edit', {
      path: ':id/edit'
    });
  });
  this.route('books', function() {
    this.route('new');

    this.route('show', {
      path: ':id'
    });

    this.route('edit', {
      path: ':id/edit'
    });
  });
  this.route('bliblablo');
  this.route('blablas', function() {
    this.route('new');

    this.route('show', {
      path: ':id'
    });

    this.route('edit', {
      path: ':id/edit'
    });
  });
  this.route('blaBlas', function() {
    this.route('new');

    this.route('show', {
      path: ':id'
    });

    this.route('edit', {
      path: ':id/edit'
    });
  });
});

export default Router;
