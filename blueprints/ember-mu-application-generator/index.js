/* eslint-env node */
/*jshint node:true*/
module.exports = {
  description: '',

  normalizeEntityName: function() {},

  // to install important packages
  afterInstall: function(options) {
    this.addPackageToProject('jquery-datetimepicker', '^2.5.4');
    this.addAddonToProject('ember-power-select', '^1.9.3');
    this.addAddonToProject('ember-datetimepicker', '^2.1.0');
    return this.addAddonToProject('ember-changeset', '^1.3.0');
  }
};
