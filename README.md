marina-tree
===========

[![Build Status](https://travis-ci.org/danielmartinezvigo/marina-tree.svg?branch=master)](https://travis-ci.org/danielmartinezvigo/marina-tree)

An extensible logical tree evaluator.

`npm i marina-tree`

Usage
-----

### Single Fact

The same fact will be evaluated in all functions in the tree.

![Marina](https://raw.githubusercontent.com/danielmartinezvigo/marina-tree/master/example1.png)

```javascript
const Marina = require('marina-tree');

// Functions definition
const myFuncs = {
  isAnArray: (param) => {
    return param instanceof Array;
  },
  isANumber: (param) => {
    return typeof param === 'number';
  },
  isOdd: (param) => {
    return param % 2 === 1;
  },
};

// Initialize with my functions and a string (wildcard) that will indicate nesting.
const marina = new Marina(myFuncs, '*');

// Build my conditions tree
const myTree = {
  funcs: ['isAnArray', '*'],
  facts: [
    null, // Padding
    {
      funcs: ['isANumber', 'isOdd'],
      operator: 'and',
    }
  ],
  operator: 'or',
};

console.log(marina.eval(myTree, 2));  // false
console.log(marina.eval(myTree, 3));  // true
console.log(marina.eval(myTree, {})); // false
console.log(marina.eval(myTree, [])); // true
```

![Marina](https://raw.githubusercontent.com/danielmartinezvigo/marina-tree/master/example2.png)

```javascript
const Marina = require('marina-tree');

// Functions definition
const myFuncs = {
  isAnArray: (param) => {
    return param instanceof Array;
  },
  isANumber: (param) => {
    return typeof param === 'number';
  },
  isGte10: (param) => {
    return param >= 10;
  },
  isLte100: (param) => {
    return param <= 100;
  },
  isAFunction: (param) => {
    return typeof param === 'function';
  },
};

// Initialize with my functions and a string (wildcard) that will indicate nesting.
const marina = new Marina(myFuncs, '*');

// Build my conditions tree
const myTree = {
  funcs: ['*', '*'],
  facts: [
    {
      funcs: ['isANumber', 'isGte10', 'isLte100'],
      operator: 'and',
    },
    {
      funcs: ['isANumber', '*'],
      facts: [
        null, // Padding
        {
          funcs: ['isANumber'],
          operator: 'not',
        }
      ],
      operator: 'or',
    },
  ],
  operator: 'or',
};

console.log(marina.eval(myTree, 2));    // false
console.log(marina.eval(myTree, 3));    // false
console.log(marina.eval(myTree, {}));   // true
console.log(marina.eval(myTree, []));   // true
console.log(marina.eval(myTree, 9));    // false
console.log(marina.eval(myTree, 10));   // true
console.log(marina.eval(myTree, 100));  // true
console.log(marina.eval(myTree, 101));  // false
console.log(marina.eval(myTree, (() => console.log('is a function'))));  // true
```

### Nested Fact

Each function will receive a specific fact as parameter.

![Marina](https://raw.githubusercontent.com/danielmartinezvigo/marina-tree/master/example3.png)

```javascript
const Marina = require('marina-tree');

// Functions definition
const myFuncs = {
  isAnArray: (param) => {
    return param instanceof Array;
  },
  isANumber: (param) => {
    return typeof param === 'number';
  },
  isTrue: (param) => {
    return param === true;
  },
};

// Initialize with my functions and a string (wildcard) that will indicate nesting.
const marina = new Marina(myFuncs, '*');

// Build my conditions tree
const myTree = {
  funcs: ['*', '*'],
  facts: [
    {
      funcs: ['isANumber', 'isAnArray'],
      operator: 'and',
    },
    {
      funcs: ['isTrue', 'isTrue', 'isTrue'],
      operator: 'xor',
    },
  ],
  operator: 'and',
};

const myNestedFact1 = [
  [
    1,
    ['foo','bar'],
  ],
  [
    false,
    false,
    false,
  ],
];
console.log(marina.eval(myTree, myNestedFact1));  // false

const myNestedFact2 = [
  [
    1,
    ['foo','bar'],
  ],
  [
    true,
    false,
    false,
  ],
];
console.log(marina.eval(myTree, myNestedFact2));  // true

const myNestedFact3 = [
  [
    1,
    ['foo','bar'],
  ],
  [
    true,
    true,
    false,
  ],
];
console.log(marina.eval(myTree, myNestedFact3));  // false

const myNestedFact4 = [
  [
    1,
    'foo bar',
  ],
  [
    true,
    false,
    false,
  ],
];
console.log(marina.eval(myTree, myNestedFact4));  // false
```

Operators
-----
* and
* nand
* or
* xor
* not
* none
* ... (alias for none)

Marina
-----
![Marina](https://raw.githubusercontent.com/danielmartinezvigo/marina-tree/master/logo.jpg)

License
-------------
MIT
