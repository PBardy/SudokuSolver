export const EMPTY_SUDOKU = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

export const DEFAULT_SUDOKU = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0]
];

export const INVALID_SOLUTION = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
];

export function isSafe(grid: number[][], row: number, column: number, num: number): boolean {

  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) {
      return false;
    }
  }

  for (let x = 0; x < 9; x++) {
    if (grid[x][column] === num) {
      return false;
    }
  }

  const startRow = row - (row % 3);
  const startColumn = column - (column % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startColumn] === num) {
        return false;
      }
    }
  }

  return true;
}

export function backtrack(grid: number[][], row: number, column: number): boolean {
  if (row === 8 && column === 9) return true;

  if (column === 9) {
    row = row + 1;
    column = 0;
  }

  if (grid[row][column] > 0) {
    return backtrack(grid, row, column + 1);
  }

  for (let num = 1; num < 10; num++) {
    if (isSafe(grid, row, column, num)) {
      grid[row][column] = num;
      if (backtrack(grid, row, column + 1)) {
        return true;
      }
    }
    grid[row][column] = 0;
  }

  return false;
}

export function solve(grid: number[][]): number[][] {
  return backtrack(grid, 0, 0) ? grid : INVALID_SOLUTION;
}