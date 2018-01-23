marina-tree
===========

[![Build Status](https://travis-ci.org/danielmartinezvigo/marina-tree.svg?branch=master)](https://travis-ci.org/danielmartinezvigo/marina-tree)

A extensible logical tree evaluator, written on node.js.

`npm install marina-tree`

Usage
-----

### Using marina.eval(tree)

```javascript
const Marina = require('marina-tree');

// define my functions
const funcs = {
  doSomethingCool: (params) => {
    let result = true;
    // things are done
    return result;
  },
  doSomethingEvil: (params) => {
    let result = false;
    // things are done
    return result;
  }
}

// initialize
const marina = new Marina({funcs});

// build my tree
const myTree = {
  funcs: ['doSomethingCool', 'marina'],
  facts: [
    'it is not important', // the paramter for doSomethingCool
    {
      funcs: ['doSomethingCool', 'doSomethingEvil'],
      facts: [null, null],
      operator: 'or'
    } // and the paramter for marina.eval
  ],
  operator: 'and'
}

// the following will print 'true'
console.log(marina.eval(myTree));
```

### Using marina.eval(tree, fact)

```javascript
const Marina = require('marina-tree');

// define my functions
const funcs = {
  doSomethingCool: (params) => {
    let result = true;
    // things are done
    return result;
  },
  doSomethingEvil: (params) => {
    let result = false;
    // things are done
    return result;
  }
}

// initialize
const marina = new Marina({funcs});

// build my tree
const myTree = {
  funcs: ['doSomethingEvil', 'marina'],
  facts: [
    3.1415, // this will be replaced for theFact
    {
      funcs: ['doSomethingCool', 'doSomethingEvil', 'returnTrue'],
      facts: [
        'John Doe', // this will be replaced for theFact
        [2,3,5,7,11,13,17], // this will be replaced for theFact
        'Club Nacional de Football' // this will be replaced for theFact
      ],
      operator: 'or'
    } // and the paramter for marina.eval
  ],
  operator: 'or'
}

const theFact = {
  data: {
    // some data
  },
  moreDate: []
}

// the following will print 'true'
console.log(marina.eval(myTree, theFact));
```

Funcs!
-----
* Must receive a parameter and return true or false.

Facts
-----
* If (funcs instanceof Array && facts instanceof Array) => **funcs.length** must be equal to **facts.length**.

* If (funcs instanceof Array && !(facts instanceof Array)) => **facts** will be the parameter for **all** functions in **funcs**.

Operators
-----
* and
* nand
* or
* xor
* not
* none
* ... (alias of none)

More examples
-------------

```javascript
const myTree = {
  funcs: ['returnTrue', 'returnFalse', 'marina'],
  facts: [
    'it is not important',
    'it is not important too',
    {
      funcs: ['returnFalse', 'marina'],
      facts: [
        'it is not important too',
        {
          funcs: ['returnTrue', 'returnTrue'],
          facts: [null, null],
          operator: 'and'
        }
      ],
      operator: 'or'
    }
  ],
  operator: 'or'
}

console.log(marina.eval(myTree)); // true
```

```javascript
const myTree = {
  funcs: ['returnTrue', 'marina'],
  facts: {
      funcs: ['returnTrue', 'marina'],
      facts: [
        'it is not important',
        {
          funcs: ['returnTrue', 'returnFalse'],
          operator: 'xor'
        }
      ],
      operator: 'and'
  },
  operator: 'xor'
}

console.log(marina.eval(myTree)); // false
```

Marina
-----
![Marina](https://raw.githubusercontent.com/danielmartinezvigo/marina-tree/master/logo.jpg)

License
-------------
MIT
