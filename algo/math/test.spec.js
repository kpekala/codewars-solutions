const { comp } = require('./are-they-same');

describe('Are they the same', () => {
  test('simple test', () => {
    a = [121, 144, 19, 161, 19, 144, 19, 11];
    b = [121, 14641, 20736, 361, 25921, 361, 20736, 361];
    expect(comp(a, b)).toBe(true);
  });
});
