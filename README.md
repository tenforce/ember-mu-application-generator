# ember-mu-application-generator

Generator for a full browseable CRUD front-end for a mu-cl-resources back-end.

The generator commands can be generated based on a domain.lisp file with the [ember-mu-application-generator-generator](https://git.tenforce.com/mu-semtech/ember-mu-application-generator-generator). This script also generates dispatcher rules to route calls from Ember to mu-cl-resources.

Usage:

```ember generate resgen [resource name] ([attribute name](:[type]))* ([relationship name]:(belongs-to|has-many):[type](~[inverse relationship name]))*```

The blueprint takes a flag `--readonly` which generates the same Ember code but with pages to edit or create new of these resources. 

Example:

```ember generate resgen taco filling:belongs-to:protein~fills toppings:has-many:toppings name:string price:number misc --readonly```

