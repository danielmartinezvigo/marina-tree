'use strict';

const defaultfuncs = require('./funcs');
const validations = require('./validations')
const utils = require('./utils');

const errors = {
  notBoolean: 'function must return true or false',
  notArray: 'params.funcs: must be array',
  functionNotFound: 'function not found',
  lengths: 'params.funcs.length !== params.facts.length',
  mustBeObject: 'must be object',
  mustBeString: 'must be string',
  mustBeDefined: 'must be defined'
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
      if (f === 'marina') {
        const marinilla = new Marina({funcs: marina.F});
        if (marina.fact === undefined)
          result = marinilla.eval(fact);
        else if (marina.fact instanceof Array && marina.fact.length === params.funcs.length)
          result = marinilla.eval(fact, marina.fact[i]);
        else
          result = marinilla.eval(fact, marina.fact);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        if (marina.fact === undefined)
          result = marina.F[f](fact);
        else if (marina.fact instanceof Array && marina.fact.length === params.funcs.length)
          result = marina.F[f](marina.fact[i]);
        else
          result = marina.F[f](marina.fact);
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
      if (f === 'marina') {
        const marinilla = new Marina({funcs: marina.F});
        if (marina.fact === undefined)
          result = marinilla.eval(params.facts[i]);
        else if (marina.fact instanceof Array && marina.fact.length === params.funcs.length)
          result = marinilla.eval(params.facts[i],marina.fact[i]);
        else
          result = marinilla.eval(params.facts[i],marina.fact);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        if (marina.fact === undefined)
          result = marina.F[f](params.facts[i]);
        else if (marina.fact instanceof Array && marina.fact.length === params.funcs.length)
          result = marina.F[f](marina.fact[i]);
        else
          result = marina.F[f](marina.fact);
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
      if (f === 'marina') {
        const marinilla = new Marina({funcs: marina.F});
        if (marina.fact === undefined)
          result = marinilla.eval(fact);
        else if (marina.fact instanceof Array && marina.fact.length === params.funcs.length)
          result = marinilla.eval(fact, marina.fact[i]);
        else
          result = marinilla.eval(fact, marina.fact);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        if (marina.fact === undefined)
          result = marina.F[f](fact);
        else if (marina.fact instanceof Array && marina.fact.length === params.funcs.length)
          result = marina.F[f](marina.fact[i]);
        else
          result = marina.F[f](marina.fact);
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
      if (f === 'marina') {
        const marinilla = new Marina({funcs: marina.F});
        if (marina.fact === undefined)
          result = marinilla.eval(params.facts[i]);
        else if (marina.fact instanceof Array && marina.fact.length === params.funcs.length)
          result = marinilla.eval(params.facts[i],marina.fact[i]);
        else
          result = marinilla.eval(params.facts[i],marina.fact);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        if (marina.fact === undefined)
          result = marina.F[f](params.facts[i]);
        else if (marina.fact instanceof Array && marina.fact.length === params.funcs.length)
          result = marina.F[f](marina.fact[i]);
        else 
          result = marina.F[f](marina.fact);
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
      if (f === 'marina') {
        const marinilla = new Marina({funcs: marina.F});
        let localResult;
        if (marina.fact === undefined)
          localResult = marinilla.eval(fact);
        else
          localResult = marinilla.eval(fact,marina.fact);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        if (counter > 1)
          result = false;
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        let localResult;
        if (marina.fact === undefined)
          localResult = marina.F[f](fact);
        else
          localResult = marina.F[f](marina.fact);
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
      if (f === 'marina') {
        const marinilla = new Marina({funcs: marina.F});
        let localResult;
        if (marina.fact === undefined)
          localResult = marinilla.eval(params.facts[i]);
        else
          localResult = marinilla.eval(params.facts[i], marina.fact);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        if (counter > 1)
          result = false;
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        let localResult;
        if (marina.fact === undefined)
          localResult = marina.F[f](params.facts[i]);
        else
          localResult = marina.F[f](marina.fact);
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
      if (f === 'marina') {
        const marinilla = new Marina({funcs: marina.F});
        let localResult;
        if (marina.fact === undefined)
          localResult = marinilla.eval(fact);
        else
          localResult = marinilla.eval(fact,marina.fact);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        else
          result = true;
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        let localResult;
        if (marina.fact === undefined)
          localResult = marina.F[f](fact);
        else
          localResult = marina.F[f](marina.fact);
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
      if (f === 'marina') {
        const marinilla = new Marina({funcs: marina.F});
        let localResult;
        if (marina.fact === undefined)
          localResult = marinilla.eval(params.facts[i]);
        else
          localResult = marinilla.eval(params.facts[i], marina.fact);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        else
          result = true;
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        let localResult;
        if (marina.fact === undefined)
          localResult = marina.F[f](params.facts[i]);
        else
          localResult = marina.F[f](marina.fact);
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
  if (f === 'marina') {
    const marinilla = new Marina({funcs: marina.F});
    let result;
    if (marina.fact === undefined)
      result = marinilla.eval(fact);
    else if (marina.fact instanceof Array)
      result = marinilla.eval(fact,marina.fact[0]);
    else
      result = marinilla.eval(fact,marina.fact);
    if (!(result === true || result === false))
      throw new Error(`${f}: ${errors.notBoolean}`);
    return !(result);
  } else {
    if (utils.undefinedOrNull(marina.F[f]))
      throw new Error(`${f}: ${errors.functionNotFound}`);
    let result;
    if (marina.fact === undefined)
      result = marina.F[f](fact);
    else if (marina.fact instanceof Array)
      result = marina.F[f](marina.fact[0]);
    else
      result = marina.F[f](marina.fact);
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
  if (f === 'marina') {
    const marinilla = new Marina({funcs: marina.F});
    let result;
    if (marina.fact === undefined)
      result = marinilla.eval(fact);
    else if (marina.fact instanceof Array)
      result = marinilla.eval(fact, marina.fact[0]);
    else
      result = marinilla.eval(fact,marina.fact);
    if (!(result === true || result === false))
      throw new Error(`${f}: ${errors.notBoolean}`);
    return result;
  } else {
    if (utils.undefinedOrNull(marina.F[f]))
      throw new Error(`${f}: ${errors.functionNotFound}`);
    let result;
    if (marina.fact === undefined)
      result = marina.F[f](fact);
    else if (marina.fact instanceof Array)
      result = marina.F[f](marina.fact[0]);
    else
      result = marina.F[f](marina.fact);
    if (!(result === true || result === false))
      throw new Error(`${f}: ${errors.notBoolean}`);
    return result;
  }
}

class Marina {
  constructor (params) {
    if (!validations.marinaConstructor(params, {verbose: true}))
      throw new Error(JSON.stringify(validations.validateConstructor.errors));
    if (!utils.undefinedOrNull(params.funcs) && params.funcs instanceof Object)
      this.F = utils.mergeObjets([defaultfuncs, params.funcs]);
    else
      this.F = defaultfuncs;
  }

  eval (params) {
    if (!validations.marinaEval(params, {verbose: true}))
      throw new Error(JSON.stringify(validations.marinaEval.errors));
    switch (params.operator) {
      case 'and':
        return and(params, this);
        break;
      case 'or':
        return or(params, this);
        break;
      case 'xor':
        return xor(params, this);
        break;
      case 'nand':
        return nand(params, this);
        break;
      case 'not':
        return not(params, this);
        break;
      case 'none':
      case '':
      case '...':
      case undefined:
      case null:
        return none(params, this);
        break;
      default:
        throw new Error('unknown opeator');
        break;
    }
  }

  eval (params, fact) {
    let result;
    if (!validations.marinaEval(params, {verbose: true}))
      throw new Error(JSON.stringify(validations.marinaEval.errors));
    switch (params.operator) {
      case 'and':
        this.fact = fact;
        result = and(params, this);
        delete this.fact;
        return result;
        break;
      case 'or':
        this.fact = fact;
        result = or(params, this);
        delete this.fact;
        return result;
        break;
      case 'xor':
        this.fact = fact;
        result = xor(params, this);
        delete this.fact;
        return result;
        break;
      case 'nand':
        this.fact = fact;
        result = nand(params, this);
        delete this.fact;
        return result;
        break;
      case 'not':
        this.fact = fact;
        result = not(params, this);
        delete this.fact;
        return result;
        break;
      case 'none':
      case '':
      case '...':
      case undefined:
      case null:
        this.fact = fact;
        result = none(params, this);
        delete this.fact;
        return result;
        break;
      default:
        throw new Error('unknown opeator');
        break;
    }
  }
}

module.exports = Marina;
