function sumPairs(ints, s) {
  let l, r;
  const m = {};
  ints.forEach((item, i) => {
    m[item] = i;
  });

  for (let i = 0; i < ints.length; i++) {
    if (m[s - ints[i]] > i && (r === undefined || m[r] > m[s - ints[i]])) {
      l = ints[i];
      r = ints[m[s - ints[i]]];
    }
  }

  return l === undefined ? undefined : [l, r];
}
