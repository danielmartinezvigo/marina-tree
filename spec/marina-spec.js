'use strict';

const Marina = require('../marina');
const defaultFuncs = require('../funcs.js');

const someFuncs = {
  eq: (params) => {
    try {
      return params.first === params.second;
    } catch (_) {
      return false;
    }
  },
  lt: (params) => {
    try {
      return params[0] < params[1];
    } catch (_) {
      return false;
    }
  },
  gt: (params) => {
    try {
      return params[0] > params[1];
    } catch (_) {
      return false;
    }
  }
}
describe('Test', () => {
  const marina = new Marina({
    funcs: someFuncs
  });
  // NONE -------------------
  // NONE -------------------
  // NONE -------------------
  describe('Operator NONE', () => {
    beforeAll(() => console.log('\nOperator NONE'));
    let tree1 = {
      funcs: 'eq',
      facts: {
        first: 'a',
        second: 'a'
      },
      operator: 'none'
    }
    it('should return true', () => {
      expect(marina.eval(tree1)).toBe(true);
    });
    let tree2 = {
      funcs: ['eq'],
      facts: {
        first: 'a',
        second: 'a'
      },
      operator: ''
    }
    it('should return true', () => {
      expect(marina.eval(tree2)).toBe(true);
    });
    let tree3 = {
      funcs: 'eq',
      facts: [{
        first: 'a',
        second: 'b'
      }],
      operator: '...'
    }
    it('should return false', () => {
      expect(marina.eval(tree3)).toBe(false);
    });
  });
  // NOT -------------------
  // NOT -------------------
  // NOT -------------------
  describe('Operator NOT', () => {
    beforeAll(() => console.log('\nOperator NOT'));
    let tree1 = {
      funcs: 'eq',
      facts: {
        first: 'a',
        second: 'a'
      },
      operator: 'not'
    }
    it('should return false', () => {
      expect(marina.eval(tree1)).toBe(false);
    });
    let tree2 = {
      funcs: ['eq'],
      facts: {
        first: 'a',
        second: 'a'
      },
      operator: 'not'
    }
    it('should return false', () => {
      expect(marina.eval(tree2)).toBe(false);
    });
    let tree3 = {
      funcs: ['eq'],
      facts: [{
        first: 'a',
        second: 'b'
      }],
      operator: 'not'
    }
    it('should return true', () => {
      expect(marina.eval(tree3)).toBe(true);
    });
  });
  // AND -------------------
  // AND -------------------
  // AND -------------------
  describe('Operator AND', () => {
    beforeAll(() => console.log('\nOperator AND'));;
    let tree1 = {
      funcs: ['eq', 'returnTrue'],
      facts: [
        {
          first: 'a',
          second: 'a'
        },
        null
      ],
      operator: 'and'
    }
    it('should return true', () => {
      expect(marina.eval(tree1)).toBe(true);
    });
    let tree2 = {
      funcs: ['eq', 'returnTrue'],
      facts: [
        {
          first: 'a',
          second: 'b'
        },
        null
      ],
      operator: 'and'
    }
    it('should return false', () => {
      expect(marina.eval(tree2)).toBe(false);
    });
    let tree3 = {
      funcs: ['eq', 'returnFalse'],
      facts: [
        {
          first: 'a',
          second: 'b'
        },
        null
      ],
      operator: 'and'
    }
    it('should return false', () => {
      expect(marina.eval(tree3)).toBe(false);
    });
  });
  // OR -------------------
  // OR -------------------
  // OR -------------------
  describe('Operator OR', () => {
    beforeAll(() => console.log('\nOperator OR'));
    let tree1 = {
      funcs: ['eq', 'returnTrue'],
      facts: [
        {
          first: 'a',
          second: 'a'
        },
        null
      ],
      operator: 'or'
    }
    it('should return true', () => {
      expect(marina.eval(tree1)).toBe(true);
    });
    let tree2 = {
      funcs: ['eq', 'returnTrue'],
      facts: [
        {
          first: 'a',
          second: 'b'
        },
        null
      ],
      operator: 'or'
    }
    it('should return true', () => {
      expect(marina.eval(tree2)).toBe(true);
    });
    let tree3 = {
      funcs: ['eq', 'returnFalse'],
      facts: [
        {
          first: 'a',
          second: 'b'
        },
        null
      ],
      operator: 'or'
    }
    it('should return false', () => {
      expect(marina.eval(tree3)).toBe(false);
    });
  });
  // XOR -------------------
  // XOR -------------------
  // XOR -------------------
  describe('Operator XOR', () => {
    beforeAll(() => console.log('\nOperator XOR'));
    let tree1 = {
      funcs: ['eq', 'returnTrue'],
      facts: [
        {
          first: 'a',
          second: 'a'
        },
        null
      ],
      operator: 'xor'
    }
    it('should return false', () => {
      expect(marina.eval(tree1)).toBe(false);
    });
    let tree2 = {
      funcs: ['eq', 'returnTrue'],
      facts: [
        {
          first: 'a',
          second: 'b'
        },
        null
      ],
      operator: 'xor'
    }
    it('should return true', () => {
      expect(marina.eval(tree2)).toBe(true);
    });
    let tree3 = {
      funcs: ['eq', 'returnFalse'],
      facts: [
        {
          first: 'a',
          second: 'b'
        },
        null
      ],
      operator: 'xor'
    }
    it('should return false', () => {
      expect(marina.eval(tree3)).toBe(false);
    });
  });
  // NAND -------------------
  // NAND -------------------
  // NAND -------------------
  describe('Operator NAND', () => {
    beforeAll(() => console.log('\nOperator NAND'));
    let tree1 = {
      funcs: ['eq', 'returnTrue'],
      facts: [
        {
          first: 'a',
          second: 'a'
        },
        null
      ],
      operator: 'nand'
    }
    it('should return false', () => {
      expect(marina.eval(tree1)).toBe(false);
    });
    let tree2 = {
      funcs: ['eq', 'returnTrue'],
      facts: [
        {
          first: 'a',
          second: 'b'
        },
        null
      ],
      operator: 'nand'
    }
    it('should return true', () => {
      expect(marina.eval(tree2)).toBe(true);
    });
    let tree3 = {
      funcs: ['eq', 'returnFalse'],
      facts: [
        {
          first: 'a',
          second: 'b'
        },
        null
      ],
      operator: 'nand'
    }
    it('should return true', () => {
      expect(marina.eval(tree3)).toBe(true);
    });
    let tree4 = {
      funcs: ['returnTrue', 'returnTrue', 'returnFalse', 'returnTrue'],
      operator: 'nand'
    }
    it('should return true', () => {
      expect(marina.eval(tree4)).toBe(true);
    });
  });
  // Marina -------------------
  // Marina -------------------
  // Marina -------------------
  describe('Operator Marina', () => {
    beforeAll(() => console.log('\nOperator Marina'));
    let tree1 = {
      funcs: ['marina', 'returnTrue'],
      facts: [
        {
          funcs: 'returnTrue',
        },
        null
      ],
      operator: 'and'
    }
    it('should return true', () => {
      expect(marina.eval(tree1)).toBe(true);
    });
    let tree2 = {
      funcs: ['marina', 'returnTrue'],
      facts: [
        {
          funcs: 'marina',
          facts: {
            funcs: 'returnFalse',
            operator: 'not'
          }
        },
        null
      ],
      operator: 'and'
    }
    it('should return true', () => {
      expect(marina.eval(tree1)).toBe(true);
    });
    let tree3 = {
      funcs: ['marina', 'marina'],
      facts: [
        {
          funcs: 'marina',
          facts: {
            funcs: ['returnFalse', 'returnTrue'],
            operator: 'and'
          }
        },
        {
          funcs: 'marina',
          facts: {
            funcs: 'returnFalse',
            operator: 'not'
          }
        }
      ],
      operator: 'xor'
    }
    it('should return true', () => {
      expect(marina.eval(tree1)).toBe(true);
    });
  });
});