const validator = require('is-my-json-valid');

module.exports = {
  marinaConstructor: validator({
      type: 'object',
      required: true,
    }
  ),
  marinaEval: validator(
    {
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
        operator: /^(and|or|xor|none|not||\.|\..|\..)+$/,
      }
    }
  )
};
