function canUseNumber(puzzle, x, y, n) {
  // check row
  for(let ix = 0; ix <9; ix++) {
    if (ix !== x && puzzle[y][ix] === n) return false 
  }
  // check column
  for(let iy = 0; iy <9; iy++) {
    if (iy !== y && puzzle[iy][x] === n) return false 
  }
  // check square
  for(let iy = y - ((y % 3)); iy < y - ((y % 3)) + 3; iy++) {
    for(let ix = x - ((x % 3)); ix < x - ((x % 3)) + 3; ix++) {
      if ((ix !== x || iy !== y) && puzzle[iy][ix] === n)
        return false;
    }
  }
  return true;
}

function solve(puzzle, x, y) {
  if (puzzle[y][x] > 0) {
    let nx = (x + 1) % 9;
    let ny = y;
    if (nx === 0){
      if (y === 8) return puzzle;
      ny += 1;
    }
    const p = solve(puzzle, nx, ny);
    if (p) return p;
  }
  for(let i = 1; i<=9; i++) {
    if (canUseNumber(puzzle, x, y, i)) {
      puzzle[y][x] = i;
      let nx = (x + 1) % 9;
      let ny = y;
      if (nx === 0){
        if (y === 8) return puzzle;
        ny += 1;
      }
      const p = solve(puzzle, nx, ny);
      if (p) return p;
    }
  }
  return puzzle;
}

exports.sudoku = function(puzzle) {
  return solve(puzzle, 0, 0);
}