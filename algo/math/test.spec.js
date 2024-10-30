const { comp } = require('./are-they-same');
const { humanReadableTime } = require('./human-time');
const { add, factorial } = require('./large-factorials');
const { determinant } = require('./determinant');

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

fdescribe('Determinant of matrix', () => {
  test('simple test', () => {
    expect(determinant([ [4, 6], [3,8]])).toBe(14);
    expect(determinant([[2,4,2],[3,1,1],[1,2,0]])).toBe(10);
  });
});

