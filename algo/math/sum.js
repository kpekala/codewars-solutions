function sumStrings(a,b) { 
  let res = Array(Math.max(a.length, b.length) + 1).fill(0);
  let remainder = 0;
  for (let i = 1; i < res.length; i++) {
    const aDigit = parseInt(a.length - i < 0 ? 0: a[a.length - i]);
    const bDigit = parseInt(b.length - i < 0 ? 0: b[b.length - i]);
    const localResult = aDigit + bDigit + remainder;
    remainder = Math.floor(localResult / 10);
    res[res.length - i] = localResult % 10;
  }
  if(remainder > 0) {
    res[0] = remainder;
  } 
  let i = 0;
  while(i < res.length && res[i] === 0) {
    res[i] = '';
    i++;
  }
  return res.join('').trim();
}