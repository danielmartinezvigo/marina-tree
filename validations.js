'use strict';

const validator = require('is-my-json-valid');

const validators = {
  marinaConstructor: validator({
    type: 'object',
    required: true,
  }),
  marinaEval: validator({
    type: ['object', 'array'],
    required: true,
    properties: {
      operator: {
        type: 'string',
        format: 'operator',
      }
    }
  },
  {
    formats: {
      operator: /^(and|or|xor|none|not|nand||\.\.\.)+$/,
    }
  }),
  isNotValidTree: (tree, wildcard) => {
    if (!tree.funcs || (!tree.funcs instanceof Array && typeof tree.funcs !== 'string')) {
      return true;
    }
    const aux1 = typeof tree.funcs === 'string' ? [tree.funcs] : tree.funcs;
    const aux2 = aux1.length === 1 && !(tree.facts instanceof Array) ? [tree.facts] : tree.facts;
    if (
      (
        !tree.operator
        || ['', 'none', '...', 'not'].indexOf(tree.operator) > -1
      )
      && aux1.length > 1
    ) {
      return true;
    }
    return aux1.some((item, index) => {
      if (typeof item !== 'string') {
        return true;
      }
      if (item !== wildcard) {
        return false;
      }
      if (
        !aux2
        || !(aux2 instanceof Array)
        || !aux2[index]
      ) {
        return true;
      }
      return validators.isNotValidTree(aux2[index], wildcard);
    });
  },
  isNotValidnestedArgs: (tree, wildcard, nestedArgs) => {
    if (!tree || !tree.funcs || !nestedArgs) {
      return false;
    }
    const aux = typeof tree.funcs === 'string' ? [tree.funcs] : tree.funcs
    return aux.some((item, index) => {
      if (item === wildcard) {
        if (!(nestedArgs instanceof Array)) {
          return true;
        }
        if (aux.length !== nestedArgs.length) {
          return true;
        }
        if (!tree.facts || !tree.facts[index]) {
          return true;
        }
        return validators.isNotValidnestedArgs(tree.facts[index], wildcard, nestedArgs[index]);
      }
      return false;
    });
  }
}

module.exports = validators;
