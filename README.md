marina-tree
===========

[![Build Status](https://travis-ci.org/danielmartinezvigo/marina-tree.svg?branch=master)](https://travis-ci.org/danielmartinezvigo/marina-tree)
[![Coverage Status](https://coveralls.io/repos/github/danielmartinezvigo/marina-tree/badge.svg?branch=master)](https://coveralls.io/github/danielmartinezvigo/marina-tree?branch=master)

An extensible logical tree evaluator.

`npm i marina-tree`

# Usage

## Single Fact

The same fact will be evaluated in all functions in the tree.

![](https://raw.githubusercontent.com/danielmartinezvigo/marina-tree/master/marina-tree-1.svg)

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

![](https://raw.githubusercontent.com/danielmartinezvigo/marina-tree/master/marina-tree-2.svg)

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

## Single Fact + Nested Args

Each function will receive the same fact + a specific argument.

![](https://raw.githubusercontent.com/danielmartinezvigo/marina-tree/master/marina-tree-3.svg)

```javascript
const Marina = require('marina-tree');

// Definition of more generic and reusable functions
const myFuncs = {
  gte: (singleFact, specificArg) => {
    return singleFact[specificArg.field] >= specificArg.value;
  },
  lte: (singleFact, specificArg) => {
    return singleFact[specificArg.field] <= specificArg.value;
  },
  in: (singleFact, specificArg) => {
    return specificArg.value.indexOf(singleFact[specificArg.field]) > -1;
  },
};

// Initialize with my functions and a string (wildcard) that will indicate nesting.
const marina = new Marina(myFuncs, '*');

// Build my conditions tree
const myTree = {
  funcs: ['*', '*', '*'],
  facts: [
    {
      funcs: ['gte', 'lte'],
      operator: 'and',
    },
    {
      funcs: ['*', 'in'],
      facts: [
        {
          funcs: ['in', 'gte'],
          operator: 'and',
        },
        null, // Padding
      ],
      operator: 'or',
    },
    {
      funcs: ['in'],
      operator: 'not',
    },
  ],
  operator: 'and',
};

const nestedArgs = [
  [
    {
      field: 'age',
      value: 20,
    },
    {
      field: 'age',
      value: 80,
    },
  ],
  [
    [
      {
        field: 'lang',
        value: ['java', 'c++'],
      },
      {
        field: 'exp',
        value: 5,
      },
    ],
    {
      field: 'lang',
      value: ['cobol'],
    },
  ],
  [
    {
      field: 'lang',
      value: ['php']
    },
  ],
];

const persons = [
  {
    age: 20,
    lang: 'c++',
    exp: 2,
  },
  {
    age: 25,
    lang: 'java',
    exp: 5,
  },
  {
    age: 60,
    lang: 'cobol',
    exp: 30,
  },
  {
    age: 30,
    lang: 'php',
    exp: 10,
  },
];

console.log(marina.eval(myTree, persons[0], nestedArgs)); // false
console.log(marina.eval(myTree, persons[1], nestedArgs)); // true
console.log(marina.eval(myTree, persons[2], nestedArgs)); // true
console.log(marina.eval(myTree, persons[3], nestedArgs)); // false
```

# Operators

* and
* nand
* or
* xor
* not (unary)
* none (unary)
* ... (alias for none) (unary)

# Marina

![Marina](https://raw.githubusercontent.com/danielmartinezvigo/marina-tree/master/logo.jpg)

# License

MIT
