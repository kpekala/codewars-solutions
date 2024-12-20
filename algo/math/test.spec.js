const { comp } = require('./are-they-same');
const { humanReadableTime } = require('./human-time');
const { add, factorial } = require('./large-factorials');
const { determinant } = require('./determinant');
const { getTokens, calc } = require('./eval-expression');

describe('Are they the same', () => {
  test('simple test', () => {
    a = [121, 144, 19, 161, 19, 144, 19, 11];
    b = [121, 14641, 20736, 361, 25921, 361, 20736, 361];
    expect(comp(a, b)).toBe(true);
  });
});

describe('Human Readable Time', () => {
  function doTest(seconds, expected) {
    expect(humanReadableTime(seconds)).toBe(expected);
  }
  test('simple test', () => {
    doTest(0, '00:00:00');
    doTest(59, '00:00:59');
    doTest(60, '00:01:00');
    doTest(90, '00:01:30');
    doTest(3599, '00:59:59');
    doTest(3600, '01:00:00');
    doTest(45296, '12:34:56');
    doTest(86399, '23:59:59');
    doTest(86400, '24:00:00');
    doTest(359999, '99:59:59');
  });
});

describe('Large factorials', () => {
  test('factorial', () => {
    expect(factorial(5)).toBe('120');
    expect(factorial(6)).toBe('720');
    expect(factorial(10)).toBe('3628800');
    expect(factorial(11)).toBe('39916800');
    expect(factorial(13)).toBe('6227020800');
    expect(factorial(15)).toBe('1307674368000');
  });
});

describe('Determinant of matrix', () => {
  test('simple test', () => {
    expect(determinant([ [4, 6], [3,8]])).toBe(14);
    expect(determinant([[2,4,2],[3,1,1],[1,2,0]])).toBe(10);
  });
});

fdescribe('Evaluation of expression', () => {
  test('getTokens', () => {
    expect(getTokens('2 + 3 / (4.233 + 1)')).toStrictEqual([2, '+', 3, '/', '(', 4.233, '+', 1, ')']);
    expect(getTokens('1-1+1*2--2')).toStrictEqual([1, '-', 1, '+', 1, '*', 2, '-', -2]);
    expect(getTokens('2 /2+3 * 4.75- -6')).toStrictEqual([2, '/', 2, '+', 3, '*', 4.75, '-', -6]);
    expect(getTokens('12*-1')).toStrictEqual([12, '*', -1]);
    expect(getTokens('12* 123/-(-5 + 2)')).toStrictEqual([12, '*', 123, '/', '-', '(', -5, '+', 2, ')']);
    expect(getTokens('1 - -(-(-(-4)))')).toStrictEqual([1, '-', '-', '(', '-', '(', '-', '(', -4, ')', ')', ')'])
  });
  test('calc', () => {
    expect(calc('2 + 3 / 4 + 1')).toBe(3.75);
    expect(calc('2 + 3 / 4 / 2 * 3 + 1')).toBe(4.125);
    expect(calc('2 + 3 / 4 / 2 * 3 + 1 / 2')).toBe(3.625);
    expect(calc('(2 + 1 / 4)')).toBe(2.25);
    expect(calc('2 * (1 + 5) / 2')).toBe(6);
    expect(calc('2 /2+3 * 4.75- -6')).toBe(21.25);
    expect(calc('12*-1')).toBe(-12);
    expect(calc('12* 123/-(-5 + 2)')).toBe(492);
    expect(calc('1 - -(-(-(-4)))')).toBe(-3);
    expect(calc('80 -(19)')).toBe(61);
    expect(calc('123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20')).toBe(-12053.760875)
    expect(calc('123.45*(678.90 / (-2.5+ 11.5))')).toBe(9312.245);
    expect(calc('(20) / 5')).toBe(4);
    expect(calc('((((80 -(19))) *33.25)) / 20')).toBe(101.4125);
    expect(calc('2 * -(10) * -(10)')).toBe(200);
    expect(calc('(5)*-(3)')).toBe(-15);
    expect(calc('(123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) - (123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) + (13 - 2)/ -(-11) ')).toBe(1)
  })
});
