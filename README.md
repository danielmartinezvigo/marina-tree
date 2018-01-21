marina-tree
===========

A extensible logical tree evaluatort, written on node.js.

`npm install marina-tree`

![Marina](https://raw.githubusercontent.com/danielmartinezvigo/marina-tree/master/logo.jpg)

Usage
-----

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
      operator: 'or'
    } // and the paramter for marina.eval
  ],
  operator: 'and'
}

// the following will print 'true'
console.log(marina.eval(myTree));
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
* or
* xor
* not
* none
* . (alias of none)
* .. (alias of none)
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

License
-------------
MIT
