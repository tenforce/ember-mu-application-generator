# ember-mu-application-generator

Generator for a full browseable CRUD front-end for a mu-cl-resources back-end.

The generator commands can be generated based on a domain.lisp file with the [ember-mu-application-generator-generator](https://git.tenforce.com/mu-semtech/ember-mu-application-generator-generator). This script also generates dispatcher rules to route calls from Ember to mu-cl-resources.

## Usage:

```ember generate resgen [resource name] ([attribute name](:[type]))* ([relationship name]:(belongs-to|has-many):[type](~[inverse relationship name]))*```

The blueprint takes a flag `--readonly` which generates the same Ember code but without pages to edit an existing or create a new record of these resources.

## Example:

```ember generate resgen taco filling:belongs-to:protein~fills toppings:has-many:toppings name:string price:number misc --readonly```

In this example `misc` will create an untyped attribute: `misc: attr()`

## Supported attribute types

Besides the built-in Ember attribute types (string, number, boolean, date) we have transforms for the followings:

  - language-string-set
    - In this Ember object we have two attributes: `content` is the content of the string and `language` is the language of the string. 
    - The `toString` method is also overwritten to return `content (language)`.
  - string-set
    - Array of strings.

### Changed attribute types
  - string
    - The \n sent back by mu-cl-resources is not considered as a line feed, so we have to do this dirty trick to actually handle it.
  - boolean
    - Mu-cl-resources seems to have issues with booleans for now (basically it complains when you try to send a boolean value). This transform was made to get around this, as it will translate a front-end boolean into a string for the DB.
    - Therefore, this transform expects the "boolean" value to be specified as a string in the domain.lisp.
    - Once that issue has been fixed, setting the property to "boolean" in domain.lisp and deleting this transform should be enough.
