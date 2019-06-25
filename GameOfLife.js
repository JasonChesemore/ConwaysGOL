function setupArray(cols, rows) {
  let arr = new Array(cols);
  for(let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }

  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;

function setup() {
  createCanvas(2000, 1000);
  cols = width / resolution;
  rows = width / resolution;
  grid = setupArray(cols, rows);

  for(let i = 0; i < cols; i++) {
    for( let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);

  let next = updatePosition(grid);

  grid = next;

  for(let i = 0; i < cols; i++) {
    for(let j =0; j < rows; j++) {
      let x = i*resolution;
      let y = j*resolution;
      if(grid[i][j] == 1) {
        fill(255);
        stroke(255);
        rect(x, y, resolution, resolution);

      }

    }
  }
}

function updatePosition(grid) {

  let next = setupArray(cols, rows);

  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {

      let count = countNeighbors(grid, i, j);
      let cell = grid[i][j];

      if(cell == 0 && count == 3) {
        next[i][j] = 1;
      }

      else if(cell == 1 && (count < 2 || count > 3)) {
        next[i][j] = 0;
      }

      else {
        next[i][j] = cell;
      }

    }
  }

return next;
}


function countNeighbors(grid, x, y) {
  let sum = 0;

  for(let i=-1; i < 2; i++) {
    for(let j=-1; j < 2; j++) {

      let column = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[column][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
