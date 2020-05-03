'use strict';

const defaultfuncs = require('./funcs');
const validations = require('./validations')
const utils = require('./utils');

const errors = {
  notBoolean: 'function must return boolean',
  notArray: 'params.funcs: must be array',
  functionNotFound: 'function not found',
  lengths: 'params.funcs.length !== params.facts.length',
  mustBeObject: 'must be object',
  mustBeString: 'must be string',
  mustBeDefined: 'must be defined',
  invalidTree: 'invalid tree',
  invalidnestedArgs: 'invalid nested args',
}

function and (params, marina) {
  let result = true;
  if (!(params.facts instanceof Array)) {
    let fact = params.facts;
    if (!(params.funcs instanceof Array))
      throw new Error(errors.notArray);
    let i = 0;
    while (result && i < params.funcs.length) {
      const f = params.funcs[i];
      if (f === marina.wildcard) {
        const marinilla = new Marina({funcs: marina.F}, marina.wildcard);
        result = marinilla.eval(fact, marina.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        result = marina.F[f](marina.fact === undefined ? fact : marina.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      }
      i += 1;
    }
    return result;
  } else {
    if (!(params.funcs instanceof Array))
      throw new Error(errors.notArray);
    if (params.funcs.length !== params.facts.length)
      throw new Error(errors.lengths);
    let i = 0;
    while (result && i < params.funcs.length) {
      const f = params.funcs[i];
      if (f === marina.wildcard) {
        const marinilla = new Marina({funcs: marina.F}, marina.wildcard);
        result = marinilla.eval(params.facts[i], marina.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        result = marina.F[f](marina.fact === undefined ? params.facts[i] : marina.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      }
      i += 1;
    }
    return result;
  }
}

function or (params, marina) {
  let result = false;
  if (!(params.facts instanceof Array)) {
    let fact = params.facts;
    if (!(params.funcs instanceof Array))
      throw new Error(errors.notArray);
    let i = 0;
    while (!result && i < params.funcs.length) {
      const f = params.funcs[i];
      if (f === marina.wildcard) {
        const marinilla = new Marina({funcs: marina.F}, marina.wildcard);
        result = marinilla.eval(fact, marina.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        result = marina.F[f](marina.fact === undefined ? fact : marina.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      }
      i += 1;
    }
    return result;
  } else {
    if (!(params.funcs instanceof Array))
      throw new Error(errors.notArray);
    if (params.funcs.length !== params.facts.length)
      throw new Error(errors.lengths);
    let i = 0;
    while (!result && i < params.funcs.length) {
      const f = params.funcs[i];
      if (f === marina.wildcard) {
        const marinilla = new Marina({funcs: marina.F}, marina.wildcard);
        result = marinilla.eval(params.facts[i], marina.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        result = marina.F[f](marina.fact === undefined ? params.facts[i] : marina.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      }
      i += 1;
    }
    return result;
  }
}

function xor (params, marina) {
  let counter = 0;
  let result = null;
  if (!(params.facts instanceof Array)) {
    let fact = params.facts;
    if (!(params.funcs instanceof Array))
      throw new Error(errors.notArray);
    let i = 0;
    while ((result === null) && i < params.funcs.length) {
      const f = params.funcs[i];
      if (f === marina.wildcard) {
        const marinilla = new Marina({funcs: marina.F}, marina.wildcard);
        const localResult = marinilla.eval(fact, params.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        if (counter > 1)
          result = false;
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        const localResult = marina.F[f](marina.fact === undefined ? fact : marina.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        if (counter > 1)
          result = false;
      }
      i += 1;
    }
    return counter === 1;
  } else {
    if (!(params.funcs instanceof Array))
      throw new Error(errors.notArray);
    if (params.funcs.length !== params.facts.length)
      throw new Error(errors.lengths);
    let i = 0;
    while ((result === null) && i < params.funcs.length) {
      const f = params.funcs[i];
      if (f === marina.wildcard) {
        const marinilla = new Marina({funcs: marina.F}, marina.wildcard);
        const localResult = marinilla.eval(params.facts[i], marina.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        if (counter > 1)
          result = false;
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        const localResult = marina.F[f](marina.fact === undefined ? params.facts[i] : marina.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        if (counter > 1)
          result = false;
      }
      i += 1;
    }
    return counter === 1;
  }
}

function nand (params, marina) {
  let counter = 0;
  let result = null;
  if (!(params.facts instanceof Array)) {
    let fact = params.facts;
    if (!(params.funcs instanceof Array))
      throw new Error(errors.notArray);
    let i = 0;
    while ((result === null) && i < params.funcs.length) {
      const f = params.funcs[i];
      if (f === marina.wildcard) {
        const marinilla = new Marina({funcs: marina.F}, marina.wildcard);
        const localResult = marinilla.eval(fact, params.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        else
          result = true;
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        const localResult = marina.F[f](marina.fact === undefined ? fact : marina.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        else
          result = true;
      }
      i += 1;
    }
    return (result === true);
  } else {
    if (!(params.funcs instanceof Array))
      throw new Error(errors.notArray);
    if (params.funcs.length !== params.facts.length)
      throw new Error(errors.lengths);
    let i = 0;
    while ((result === null) && i < params.funcs.length) {
      const f = params.funcs[i];
      if (f === marina.wildcard) {
        const marinilla = new Marina({funcs: marina.F}, marina.wildcard);
        const localResult = marinilla.eval(params.facts[i], marina.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        else
          result = true;
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        const localResult = marina.F[f](marina.fact === undefined ? params.facts[i] : marina.fact, marina.nestedArgs ? marina.nestedArgs[i] : undefined);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        else
          result = true;
      }
      i += 1;
    }
    return (result === true);
  }
}

function not (params, marina) {
  if (utils.undefinedOrNull(params.funcs) 
    || (params.funcs instanceof Array && params.funcs.length < 1))
    throw new Error(`params.funcs: ${errors.mustBeDefined}`);
  let f;
  if (params.funcs instanceof Array)
    f = params.funcs[0];
  else
    f = params.funcs;
  let fact;
  if (params.facts instanceof Array)
    fact = params.facts[0];
  else
    fact = params.facts;
  if (f === marina.wildcard) {
    const marinilla = new Marina({funcs: marina.F}, marina.wildcard);
    const result = marinilla.eval(fact, marina.fact, marina.nestedArgs ? marina.nestedArgs[0] : undefined);
    if (!(result === true || result === false))
      throw new Error(`${f}: ${errors.notBoolean}`);
    return !(result);
  } else {
    if (utils.undefinedOrNull(marina.F[f]))
      throw new Error(`${f}: ${errors.functionNotFound}`);
    const result = marina.F[f](marina.fact === undefined ? fact : marina.fact, marina.nestedArgs ? marina.nestedArgs[0] : undefined);
    if (!(result === true || result === false))
      throw new Error(`${f}: ${errors.notBoolean}`);
    return !(result);
  }
}

function none (params, marina) {
  if (utils.undefinedOrNull(params.funcs) 
    || (params.funcs instanceof Array && params.funcs.length < 1))
    throw new Error(`params.funcs: ${errors.mustBeDefined}`);
  let f;
  if (params.funcs instanceof Array)
    f = params.funcs[0];
  else
    f = params.funcs;
  let fact;
  if (params.facts instanceof Array)
    fact = params.facts[0];
  else
    fact = params.facts;
  if (f === marina.wildcard) {
    const marinilla = new Marina({funcs: marina.F}, marina.wildcard);
    const result = marinilla.eval(fact, marina.fact, marina.nestedArgs ? marina.nestedArgs[0] : undefined);
    if (!(result === true || result === false))
      throw new Error(`${f}: ${errors.notBoolean}`);
    return result;
  } else {
    if (utils.undefinedOrNull(marina.F[f]))
      throw new Error(`${f}: ${errors.functionNotFound}`);
    const result = marina.F[f](marina.fact === undefined ? fact : marina.fact, marina.nestedArgs ? marina.nestedArgs[0] : undefined);
    if (!(result === true || result === false))
      throw new Error(`${f}: ${errors.notBoolean}`);
    return result;
  }
}

class Marina {
  /**
   * @constructs
   * @param {Object} funcs Contains the functions that will be available, each function must return a boolean.
   * @param {string} [wildcard="*"] The string indicating the nesting.
   */
  constructor (funcs, wildcard='marina') {
    let params;

    if (
      // backward compatibility
      typeof funcs === 'object'
      && !(funcs instanceof Array)
      && funcs.funcs
      && typeof funcs.funcs === 'object'
      && Object.keys(funcs).length === 1
    ) {
      params = funcs;
    } else {
      params = {
        funcs
      }
    }

    if (!validations.marinaConstructor(params, {verbose: true}))
      throw new Error(JSON.stringify(validations.validateConstructor.errors));
    if (!utils.undefinedOrNull(params.funcs) && params.funcs instanceof Object)
      this.F = utils.mergeObjets([defaultfuncs, params.funcs]);
    else
      this.F = defaultfuncs;
    
    this.wildcard = wildcard;
  }

  /**
   * @param {Object} tree
   * @param {string[]} tree.funcs
   * @param {Array=} tree.facts
   * @param {('and'|'or'|'xor'|'nand'|'not'|'none'|'...')} tree.operator
   * @param {(Array|Object)} [fact]
   * @return {boolean}
   */
  eval (tree) {
    const params = tree
    if (!validations.marinaEval(params, {verbose: true}))
      throw new Error(JSON.stringify(validations.marinaEval.errors));
    if (validations.isNotValidTree(tree, this.wildcard)) {
      throw new Error(JSON.stringify(errors.invalidTree)); 
    }
    switch (params.operator) {
      case 'and':
        return and(params, this);
      case 'or':
        return or(params, this);
      case 'xor':
        return xor(params, this);
      case 'nand':
        return nand(params, this);
      case 'not':
        return not(params, this);
      case 'none':
      case '':
      case '...':
      case undefined:
      case null:
        return none(params, this);
      default:
        throw new Error('unknown opeator');
    }
  }

  /**
   * @param {Object} tree
   * @param {string[]} tree.funcs
   * @param {Array=} tree.facts
   * @param {('and'|'or'|'xor'|'nand'|'not'|'none'|'...')} tree.operator
   * @param {any} fact
   * @return {boolean}
   */
  eval (tree, fact) {
    const params = tree;
    let result;
    if (!validations.marinaEval(params, {verbose: true}))
      throw new Error(JSON.stringify(validations.marinaEval.errors));
    if (validations.isNotValidTree(tree, this.wildcard)) {
      throw new Error(JSON.stringify(errors.invalidTree)); 
    }
    switch (params.operator) {
      case 'and':
        this.fact = fact;
        result = and(params, this);
        delete this.fact;
        return result;
      case 'or':
        this.fact = fact;
        result = or(params, this);
        delete this.fact;
        return result;
      case 'xor':
        this.fact = fact;
        result = xor(params, this);
        delete this.fact;
        return result;
      case 'nand':
        this.fact = fact;
        result = nand(params, this);
        delete this.fact;
        return result;
      case 'not':
        this.fact = fact;
        result = not(params, this);
        delete this.fact;
        return result;
      case 'none':
      case '':
      case '...':
      case undefined:
      case null:
        this.fact = fact;
        result = none(params, this);
        delete this.fact;
        return result;
      default:
        throw new Error('unknown opeator');
    }
  }

  /**
   * @param {Object} tree
   * @param {string[]} tree.funcs
   * @param {Array=} tree.facts
   * @param {('and'|'or'|'xor'|'nand'|'not'|'none'|'...')} tree.operator
   * @param {Object} fact
   * @param {Array} nestedArgs
   * @return {boolean}
   */
  eval (tree, fact, nestedArgs) {
    const params = tree;
    let result;
    if (!validations.marinaEval(params, {verbose: true}))
      throw new Error(JSON.stringify(validations.marinaEval.errors));
    if (validations.isNotValidTree(tree, this.wildcard)) {
      throw new Error(JSON.stringify(errors.invalidTree)); 
    }
    if (validations.isNotValidnestedArgs(tree, this.wildcard, nestedArgs)) {
      throw new Error(JSON.stringify(errors.invalidnestedArgs)); 
    }
    switch (params.operator) {
      case 'and':
        this.fact = fact;
        this.nestedArgs = nestedArgs;
        result = and(params, this);
        delete this.fact;
        return result;
      case 'or':
        this.fact = fact;
        this.nestedArgs = nestedArgs;
        result = or(params, this);
        delete this.fact;
        return result;
      case 'xor':
        this.fact = fact;
        this.nestedArgs = nestedArgs;
        result = xor(params, this);
        delete this.fact;
        return result;
      case 'nand':
        this.fact = fact;
        this.nestedArgs = nestedArgs;
        result = nand(params, this);
        delete this.fact;
        return result;
      case 'not':
        this.fact = fact;
        this.nestedArgs = nestedArgs;
        result = not(params, this);
        delete this.fact;
        return result;
      case 'none':
      case '':
      case '...':
      case undefined:
      case null:
        this.fact = fact;
        this.nestedArgs = nestedArgs;
        result = none(params, this);
        delete this.fact;
        return result;
      default:
        throw new Error('unknown opeator');
    }
  }
}

module.exports = Marina;
