function table2d(n) {
  const arr = Array(n);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Array(n).fill(0);
  }
  return arr;
}

function isOutOfPath(x, y, map, addedNumb) {
  if (x < 0 || x >= map.length || y < 0 || y >= map.length) return true;
  if (map[y][x] === 1 && addedNumb < map.length * map.length) return true;
  return false;
}

const snail = function (array) {
  if (array.length === 0 || array[0].length === 0) return [];
  if (array.length === 1) return [array[0][0]];
  const map = table2d(array.length);
  const result = [];
  let x = 0,
    y = 0,
    kx = 1,
    ky = 0;
  const k = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  let ki = 0;
  while (true) {
    result.push(array[y][x]);
    if (result.length === array.length * array.length) {
      return result;
    }
    map[y][x] = 1;
    if (isOutOfPath(x + kx, y + ky, map, result.length)) {
      ki = (ki + 1) % 4;
      kx = k[ki][0];
      ky = k[ki][1];
    }
    x += kx;
    y += ky;
  }
};
