jsTools: $utils [![wercker status](https://app.wercker.com/status/3f20841faade376a5a8cc5aaf1051230/s "wercker status")](https://app.wercker.com/project/bykey/3f20841faade376a5a8cc5aaf1051230)
================
[![Bower version](https://badge.fury.io/bo/jengine-utils.svg)](http://badge.fury.io/bo/jengine-utils)
[![npm version](https://badge.fury.io/js/jengine-utils.svg)](http://badge.fury.io/js/jengine-utils)
[![Build Status](https://travis-ci.org/jstools/utils.svg?branch=master)](https://travis-ci.org/jstools/utils)
Installation
------------
```.sh
npm install jengine-utils --save
```
  or
```.sh
bower install jengine-utils --save
```
Usage
-----
Underscore object '_' with useful functions

``` js
// comparators
  _.isFunction(object)
  _.isString(object)
  _.isNumber(object)
  _.isArray(object)
  _.isDate(object)
  _.isRegExp(object)
  _.isObject(object)

// key handling
  _.key(key, value)
  _.keys(object)  // alias of Object.keys

// object extend and copy
  _.extend(dest, obj1, obj2)
  _.merge(dest, obj1, obj2)
  _.copy(obj)

// object matches
  _.matchAll(obj, filter)
  _.matchAny(obj, filter)

// list filter
  _.find(list, filters) // returns first match in a list
  _.filter(list, filters)

// path handling
  _.joinPath(path1, path2, path3)

  _.each(list or object, iterator)
  _.indexOf(list, value or iterator)
  _.remove(list, value or iterator)

// pipe and chainig
  _.pipe()
  _.chain()

```
