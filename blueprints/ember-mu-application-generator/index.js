/* eslint-env node */
/*jshint node:true*/
module.exports = {
  description: '',

  normalizeEntityName: function() {},

  // to install important packages
  afterInstall: function(options) {
    this.addAddonToProject('ember-power-select', '^1.9.3');
    return this.addAddonToProject('ember-changeset', '^1.3.0');
  }
};