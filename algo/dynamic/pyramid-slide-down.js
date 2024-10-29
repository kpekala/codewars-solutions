function longestSlideDown(pyramid) {
  const ny = pyramid.length;

  if (ny === 0) return 0;
  let t = [[pyramid[0][0]]];

  for (let y = 1; y < ny; y++) {
    t.push(Array(y + 1).fill(0));
    for (let x = 0; x <= y; x++) {
      if (x < y) {
        t[y][x] = t[y - 1][x] + pyramid[y][x];
      }
      if (x > 0) {
        t[y][x] = Math.max(t[y - 1][x - 1] + pyramid[y][x], t[y][x]);
      }
    }
  }
  return Math.max(...t[t.length - 1]);
}
