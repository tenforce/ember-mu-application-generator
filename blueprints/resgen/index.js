// TODO clean up packages
var inflection = require('inflection'); // TODO less aggressive inflector?
var stringUtils = require('ember-cli-string-utils');
var EOL = require('os').EOL;
var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');
var stringUtil = require('ember-cli-string-utils');
var EmberRouterGenerator = require('ember-router-generator');

/* eslint-env node */
module.exports = {

  description: 'Generates an ember-data model and an ember application to edit it.',

  anonymousOptions: [
    'name',
    'attr:type'
  ],

  locals: function(options) {

    // Model

    var attrs = [];
    var needs = [];
    var properties = [];
    var entityOptions = options.entity.options;
    var importStatements = ['import Ember from \'ember\';','import Model from \'ember-data/model\';'];
    var shouldImportAttr = false;
    var shouldImportBelongsTo = false;
    var shouldImportHasMany = false;

    for (var name in entityOptions) {
      var type = entityOptions[name] || '';
      var foreignModel = name;
      var inverseName = '';
      if (type.indexOf(':') > -1) {
        foreignModel = type.split(':')[1];
        type = type.split(':')[0];
        if (foreignModel.indexOf('~') > -1) {
          inverseName = foreignModel.split('~')[1];
          foreignModel = foreignModel.split('~')[0];
        }
      }


      var dasherizedName = stringUtils.dasherize(name);
      var camelizedName = stringUtils.camelize(name);
      var dasherizedType = stringUtils.dasherize(type);
      var dasherizedForeignModel = stringUtils.dasherize(foreignModel);
      // TODO name is given, inflect anyways? should be correct in domain.lisp, right?
      var dasherizedForeignModelSingular = inflection.singularize(dasherizedForeignModel);
      // TODO pluralize?? condionally? but then what with 1-to-1 rels?
      // bestFriend: DS.belongsTo('user', { inverse: 'bestFriend' }),
      // Let the user figure it out in domain.lisp?
      var dasherizedInverseName = stringUtils.dasherize(inverseName);

      var attr;
      if (/has-many/.test(dasherizedType)) {
        var camelizedNamePlural = inflection.pluralize(camelizedName);
        attr = dsAttr(dasherizedForeignModelSingular, dasherizedType, dasherizedInverseName);
        attrs.push(camelizedNamePlural + ': ' + attr);
        shouldImportHasMany = true;
      } else if (/belongs-to/.test(dasherizedType)) {
        attr = dsAttr(dasherizedForeignModel, dasherizedType, dasherizedInverseName);
        attrs.push(camelizedName + ': ' + attr);
        shouldImportBelongsTo = true;
      } else {
        attr = dsAttr(dasherizedName, dasherizedType);
        attrs.push(camelizedName + ': ' + attr);
        shouldImportAttr = true;
      }

      if (/has-many|belongs-to/.test(dasherizedType)) {
        needs.push('\'model:' + dasherizedForeignModelSingular + '\'');
      }


      properties.push({
        name: name,
        kind: type,
        itemVar: entityToVariable(name),
        itemVarSingle: inflection.singularize(entityToVariable(name)),
        itemRoute: entityItemRoute(name),
        itemListRoute: entityItemListRoute(name)
        // TODO some can be moved to template for clarity
      });
    }

    var needsDeduplicated = needs.filter(function(need, i) {
      return needs.indexOf(need) === i;
    });

    if (shouldImportAttr) {
      importStatements.push('import attr from \'ember-data/attr\';');
    }

    if (shouldImportBelongsTo && shouldImportHasMany) {
      importStatements.push('import { belongsTo, hasMany } from \'ember-data/relationships\';');
    } else if (shouldImportBelongsTo) {
      importStatements.push('import { belongsTo } from \'ember-data/relationships\';');
    } else if (shouldImportHasMany) {
      importStatements.push('import { hasMany } from \'ember-data/relationships\';');
    }

    importStatements = importStatements.join(EOL);
    attrs = attrs.join(',' + EOL + '  ');
    needs = '  needs: [' + needsDeduplicated.join(', ') + ']';

    // Templates and code

    var attributes = properties.filter(function(prop) {
      return prop.kind != "has-many" && prop.kind != "belongs-to";
    });
    var relationships = properties.filter(function(prop) {
      return prop.kind == "has-many" || prop.kind == "belongs-to";
    });
    var belongsToRelationships = relationships.filter(function(relationship) {
      return relationship.kind == "belongs-to";
    });
    var hasManyRelationships = relationships.filter(function(relationship) {
      return relationship.kind == "has-many";
    });

    // Return

    result = {
      // Model
      importStatements: importStatements,
      attrs: attrs, // attrs and relationships, ready to be pasted in the model template
      needs: needs, // for dependencies in unit tests

      // Templates and code
      attributes: attributes,
      relationships: relationships,
      belongsToRelationships: belongsToRelationships,
      hasManyRelationships: hasManyRelationships,
      entityName: options.entity.name,
      entitiesName: inflection.pluralize(options.entity.name),

      readonly: options.readonly,
    };

    console.log(result);

    return result;
  },

  fileMapTokens: function(options) {
    return {
      __plural_name__: function(options) {
        return options.locals.entitiesName
      }
    }
  },


  // https://github.com/ember-cli/ember-cli/issues/7287
  // files() {
  //   // TODO update file list
  //   if (this.options && this.options.readonly) {
  //     return ['app/',
  //       'app/components/',
  //       'app/components/handle-attribute.js',
  //       'app/components/display-lang-attribute.js',
  //       'app/components/display-attribute-string-set.js',
  //       'app/models/',
  //       'app/models/__name__.js',
  //       'app/routes/',
  //       'app/routes/__plural_name__/',
  //       // 'app/routes/__plural_name__/edit.js',
  //       'app/routes/__plural_name__/index.js',
  //       // 'app/routes/__plural_name__/new.js',
  //       'app/routes/__plural_name__/show.js',
  //       'app/serializers/',
  //       'app/serializers/application.js',
  //       'app/styles/',
  //       'app/styles/app.scss',
  //       'app/templates/',
  //       'app/templates/__plural_name__/',
  //       // 'app/templates/__plural_name__/edit.hbs',
  //       'app/templates/__plural_name__/index.hbs',
  //       // 'app/templates/__plural_name__/new.hbs',
  //       'app/templates/__plural_name__/show.hbs',
  //       'app/templates/components/',
  //       'app/templates/components/handle-attribute.hbs',
  //       'app/templates/components/display-lang-attribute.hbs',
  //       'app/templates/components/display-attribute-string-set.hbs'
  //     ];
  //   } else {
  //     return ['app/',
  //       'app/components/',
  //       'app/components/handle-attribute.js',
  //       'app/components/display-lang-attribute.js',
  //       'app/components/display-attribute-string-set.js',
  //       'app/models/',
  //       'app/models/__name__.js',
  //       'app/routes/',
  //       'app/routes/__plural_name__/',
  //       'app/routes/__plural_name__/edit.js',
  //       'app/routes/__plural_name__/index.js',
  //       'app/routes/__plural_name__/new.js',
  //       'app/routes/__plural_name__/show.js',
  //       'app/serializers/',
  //       'app/serializers/application.js',
  //       'app/styles/',
  //       'app/styles/app.scss',
  //       'app/templates/',
  //       'app/templates/__plural_name__/',
  //       'app/templates/__plural_name__/edit.hbs',
  //       'app/templates/__plural_name__/index.hbs',
  //       'app/templates/__plural_name__/new.hbs',
  //       'app/templates/__plural_name__/show.hbs',
  //       'app/templates/components/',
  //       'app/templates/components/handle-attribute.hbs',
  //       'app/templates/components/display-lang-attribute.hbs',
  //       'app/templates/components/display-attribute-string-set.hbs'
  //     ];
  //   }
  // },

  shouldEntityTouchRouter: function(name) {
    var isIndex = name === 'index';
    var isBasic = name === 'basic';
    var isApplication = name === 'application';

    return !isBasic && !isIndex && !isApplication;
  },

  shouldTouchRouter: function(name, options) {
    var entityTouchesRouter = this.shouldEntityTouchRouter(name);
    var isDummy = !!options.dummy;
    var isAddon = !!options.project.isEmberCLIAddon();
    var isAddonDummyOrApp = (isDummy === isAddon);

    return (entityTouchesRouter && isAddonDummyOrApp && !options.dryRun && !options.inRepoAddon && !options.skipRouter);
  },

  afterInstall: function(options) {
    // console.log(this.files()) // TODO update file list

    return updateRouter.call(this, 'add', options);
    // TODO install conditionally? npm will run even if packages are already there
    // TODO are these the right packages?
    // this.addPackageToProject('ember-i18n', '^4.3.2');
    // this.addPackageToProject('ember-promise-helpers', '^1.0.3');
    // return this.addPackageToProject('ember-data-table', '^0.6.0');
    // Ember CLI expects to resolve a promise from these hooks when running the blueprint
    // So return!
  },

  afterUninstall: function(options) {
    updateRouter.call(this, 'remove', options);
  }
};

// Model


// TODO inline this function. the caller already does the type matching...
function dsAttr(name, type, inverse) {
  if (inverse) { // is either empty or needs some more syntax
    inverse = ", {inverse: '" + inverse + "'}"
  }
  switch (type) {
    case 'belongs-to':
      return 'belongsTo(\'' + name + '\'' + inverse + ')';
    case 'has-many':
      return 'hasMany(\'' + name + '\'' + inverse + ')';
    case '':
      //"If you don't specify the type of the attribute, it will be whatever was provided by the server"
      //http://emberjs.com/guides/models/defining-models/
      return 'attr()';
    default:
      return 'attr(\'' + type + '\')';
  }
}

// Router

function updateRouter(action, options) {
  var entity = options.entity;
  var actionColorMap = {
    add: 'green',
    remove: 'red'
  };
  var color = actionColorMap[action] || 'gray';

  // TODO check consistency
  var entitiesName = inflection.pluralize(entity.name)
  // TODO update routes list
  var routes = [{
      name: entitiesName,
      options: {}
    },
    {
      name: entitiesName + '/show',
      options: {
        path: ':id'
      }
    }
  ];
  if (!options.readonly) {
    routes = routes.concat([{
        name: entitiesName + '/new',
        options: {}
      },
      {
        name: entitiesName + '/edit',
        options: {
          path: ':id/edit'
        }
      }
    ]);
  }
  var self = this;
  this.ui.writeLine('updating router');
  routes.forEach(function(route) {
    writeRoute(action, route.name, route.options, options);
    self._writeStatusToUI(chalk[color], action + ' route', route.name);
  });
}

function findRouter(options) {
  var routerPathParts = [options.project.root];

  if (options.dummy && options.project.isEmberCLIAddon()) {
    routerPathParts = routerPathParts.concat(['tests', 'dummy', 'app', 'router.js']);
  } else {
    routerPathParts = routerPathParts.concat(['app', 'router.js']);
  }

  return routerPathParts;
}

function writeRoute(action, name, routeOptions, options) {
  var routerPath = path.join.apply(null, findRouter(options));
  var source = fs.readFileSync(routerPath, 'utf-8');

  var routes = new EmberRouterGenerator(source);
  var newRoutes = routes[action](name, routeOptions);

  fs.writeFileSync(routerPath, newRoutes.code());
}

// Templates and code
var entityToVariable = function(entityName) {
  var splits = entityName.split("-");
  return [splits[0]].concat(
    splits.slice(1).map(function(word) {
      return word[0].toUpperCase() + word.substring(1);
    })
  ).join("");
}

var entityItemRoute = function(name) {
  var pluralName = inflection.pluralize(name);
  return pluralName + ".show";
}

var entityItemListRoute = function(name) {
  var pluralName = inflection.pluralize(name);
  return pluralName + ".index";
}
