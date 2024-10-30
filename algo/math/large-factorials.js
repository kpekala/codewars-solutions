function replaceAt(str, i, val) {
  return str.substring(0, i) + val + str.substring(i + 1);
}

function multiplyStrings(a, b) {
  let res = ''.padStart(a.length + b.length);
  let remainder = 0;
  for (let i = 1; i <= a.length; i++) {
    const localResult = parseInt(a[a.length - i]) * b + remainder;
    remainder = Math.floor(localResult / 10);
    res = replaceAt(res, res.length - i, (localResult % 10).toString());
  }
  if (remainder > 0) {
    res = replaceAt(res, res.length - (a.length + 1), remainder);
  }
  return res;
}

exports.factorial = function factorial(n) {
  if (n < 0) return null;
  let res = '1';
  for (let i = 2; i <= n; i++) {
    res = multiplyStrings(res, i);
  }
  return res;
};

exports.add = add;
