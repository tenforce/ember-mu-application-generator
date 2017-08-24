# ember-mu-application-generator

Generator for a full browseable CRUD front-end for a mu-cl-resources back-end.

The generator commands can be generated based on a domain.lisp file with the [ember-mu-application-generator-generator](https://git.tenforce.com/mu-semtech/ember-mu-application-generator-generator). This script also generates dispatcher rules to route calls from Ember to mu-cl-resources.

## Installation:

To install the application via git+ssh:
```
ember install ember-power-select
ember install ember-changeset
ember install git+ssh://git@git.tenforce.com:mu-semtech/ember-mu-application-generator.git
ember generate ember-mu-application-generator
```

The ember generate is needed, because on install the application should install some necessary files (transforms, utils, etc.). If ember installation is done with a git url, ember install cannot find the package name and install the default blueprint (where packagename == blueprintname).

If it's needed, you can modify the url with a tag or a branch:
```
ember install git+ssh://git@git.tenforce.com:mu-semtech/ember-mu-application-generator.git#v0.2.0
ember install git+ssh://git@git.tenforce.com:mu-semtech/ember-mu-application-generator.git#addon
```

### Design installation:

To install design, you will need `ember-cli-sass`.

```
ember install ember-cli-sass
```

After installing sass, you can either install the design via blueprint:
```
ember generate mu-application-design
```

Or include the necessary files in your app.scss:
```
$mainColor: crimson;
@import "ember-mu-application-generator";
```

The `$mainColor` has to be defined! It defines the background of the navbar and all the on hover and focused colors for buttons and input fields.

The default fonts are included in the design files and will be imported in the scss file:
- Source Sans Pro
- Font Awesome


## Usage:

```ember generate mu-resource [resource name] ([attribute name](:[type]))* ([relationship name]:(belongs-to|has-many):[type](~[inverse relationship name]))*```

The blueprint takes a flag `--readonly` which generates the same Ember code but without pages to edit an existing or create a new record of these resources.

### Example:

```ember generate mu-resource taco filling:belongs-to:protein~fills toppings:has-many:toppings name:string price:number misc --readonly```

In this example `misc` will create an untyped attribute: `misc: attr()`

## User documentation

User documentation can be found in the docs folder!

## Supported attribute types

Besides the built-in Ember attribute types (string, number, boolean, date) we have transforms for the followings:

  - language-string-set
    - In this Ember object we have two attributes: `content` is the content of the string and `language` is the language of the string.
    - The `toString` method is also overwritten to return `content (language)`.
  - string-set
    - Array of strings.
  - datetime
    - Uses the format YYYY. MM. DD. HH:mm:ss
  - g-year
    - converting it to a string
  - gemoetry
    - converting it to a string
  - uri
    - converting it to a string

### Changed attribute types
  - string
    - The \n sent back by mu-cl-resources is not considered as a line feed, so we have to do this dirty trick to actually handle it.
  - boolean
    - Mu-cl-resources seems to have issues with booleans for now (basically it complains when you try to send a boolean value). This transform was made to get around this, as it will translate a front-end boolean into a string for the DB.
    - Therefore, this transform expects the "boolean" value to be specified as a string in the domain.lisp.
    - Once that issue has been fixed, setting the property to "boolean" in domain.lisp and deleting this transform should be enough.
  - date
    - Uses the format YYYY. MM. DD.
