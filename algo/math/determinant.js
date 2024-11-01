function det(m, startY, xsSkipped) {
  if (startY === m.length - 1) {
    let prev = -1;
    for (let x = 0; x < m.length; x++) {
      if (!xsSkipped.includes(x)) return m[startY][x];
    }
  }

  xsSkipped.sort();
  let result = 0;
  let sign = 1;
  for (let x = 0; x < m.length; x++) {
    if (!xsSkipped.includes(x)) {
      result += sign * m[startY][x] * det(m, startY + 1, xsSkipped.concat(x));
      sign = -sign;
    }
  }
  return result;
}

exports.determinant = function (m) {
  return det(m, 0, []);
};
