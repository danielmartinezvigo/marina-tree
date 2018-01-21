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
        result = marinilla.eval(fact);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        result = marina.F[f](fact);
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
        result = marinilla.eval(params.facts[i]);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        result = marina.F[f](params.facts[i]);
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
        result = marinilla.eval(fact);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        result = marina.F[f](fact);
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
        result = marinilla.eval(params.facts[i]);
        if (!(result === true || result === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        result = marina.F[f](params.facts[i]);
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
        const localResult = marinilla.eval(fact);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        if (counter > 1)
          result = false;
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        const localResult = marina.F[f](fact);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        if (counter > 1)
          result = false;
      }
      i += 1;
    }
    if (result === false || counter > 1 || counter < 1)
      return false;
    return true;
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
        const localResult = marinilla.eval(params.facts[i]);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        if (counter > 1)
          result = false;
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        const localResult = marina.F[f](params.facts[i]);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        if (counter > 1)
          result = false;
      }
      i += 1;
    }
    if (result === false || counter > 1 || counter < 1)
      return false;
    return true;
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
        const localResult = marinilla.eval(fact);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        else
          result = true;
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        const localResult = marina.F[f](fact);
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
        const localResult = marinilla.eval(params.facts[i]);
        if (!(localResult === true || localResult === false))
          throw new Error(`${f}: ${errors.notBoolean}`);
        if (localResult)
          counter += 1;
        else
          result = true;
      } else {
        if (utils.undefinedOrNull(marina.F[f]))
          throw new Error(`${f}: ${errors.functionNotFound}`);
        const localResult = marina.F[f](params.facts[i]);
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
    const result = marinilla.eval(fact);
    if (!(result === true || result === false))
      throw new Error(`${f}: ${errors.notBoolean}`);
    return !(result);
  } else {
    if (utils.undefinedOrNull(marina.F[f]))
      throw new Error(`${f}: ${errors.functionNotFound}`);
    const result = marina.F[f](fact);
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
    const result = marinilla.eval(fact);
    if (!(result === true || result === false))
      throw new Error(`${f}: ${errors.notBoolean}`);
    return result;
  } else {
    if (utils.undefinedOrNull(marina.F[f]))
      throw new Error(`${f}: ${errors.functionNotFound}`);
    const result = marina.F[f](fact);
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
}

module.exports = Marina;
