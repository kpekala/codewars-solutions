function table2d(n) {
  const arr = Array(n);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Array(n).fill(0);
  }
  return arr;
}

function travelShip(x, y, field, visited) {
  let kx = 0,
    ky = 0;
  const typeMap = { 1: 's', 2: 'd', 3: 'c', 4: 'b' };

  // find direction
  if (x < 9) {
    if (field[y][x + 1] === 1) {
      if (visited[y][x + 1] === 1) return false;
      kx = 1;
    }
  }
  if (y < 9) {
    if (field[y + 1][x] === 1) {
      ky = 1;
    }
  }

  if (kx === 0 && ky === 0) return 's';

  // start travelling
  let shipCellNumb = 0;
  while (true) {
    if (field[y][x] === 0) return typeMap[shipCellNumb];
    shipCellNumb++;

    if (x == 9 || y == 9) return typeMap[shipCellNumb];

    // check corners and other sites for other ships
    if (x < 9 && y < 9 && field[y + 1][x + 1] === 1) return false;
    if (x > 0 && y < 9 && field[y + 1][x - 1] === 1) return false;
    if (
      kx === 1 &&
      ((y > 0 && field[y - 1][x] === 1) || (y < 9 && field[y + 1][x] === 1))
    )
      return false;
    if (
      ky === 1 &&
      ((x > 0 && field[y][x - 1] === 1) || (x < 9 && field[y][x + 1] === 1))
    )
      return false;

    if (visited[y][x] === 1) return false;
    visited[y][x] = 1;

    x += kx;
    y += ky;
  }
  return typeMap[shipCellNumb];
}

function validateBattlefield(field) {
  const shipCellNumb = field.reduce(
    (acc, cur) => acc + cur.reduce((a, b) => a + b, 0),
    0
  );
  if (shipCellNumb !== 20) {
    return false;
  }
  const shipTypes = {
    s: 0,
    b: 0,
    c: 0,
    d: 0,
  };
  const visited = table2d(10);
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      if (visited[y][x] === 0 && field[y][x] === 1) {
        const type = travelShip(x, y, field, visited);
        if (type === false) return false;
        shipTypes[type] += 1;
      }
    }
  }
  return (
    shipTypes.s === 4 &&
    shipTypes.b === 1 &&
    shipTypes.c === 2 &&
    shipTypes.d === 3
  );
}
