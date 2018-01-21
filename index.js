const Marina = require('./marina');

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
