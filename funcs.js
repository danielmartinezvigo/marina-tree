'use strict';

const utils = require('./utils');

module.exports = {
  stringContains: (params) => {
    if (utils.undefinedOrNull(params.string) || utils.undefinedOrNull(params.substring))
      return false;
    try {
      return (params.string.indexOf(params.substring) !== -1);
    } catch (_) {
      return false;
    }
  },
  returnTrue: (_) => {
    return true;
  },
  returnFalse: (_) => {
    return false;
  },
}
