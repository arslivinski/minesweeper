import { CELL_CLOSED } from './cell_state.js';

function random(max) {
  return Math.floor(Math.random() * max);
}

/**
 * @param {import('./matrix.js').Matrix} matrix
 * @param {number} rows
 * @param {number} cols
 * @param {number} bombs
 * @returns {import('./matrix.js').Matrix}
 */
function placeBombs(matrix, rows, cols, bombs) {
  let bombsLeft = bombs;

  while (bombsLeft > 0) {
    const row = random(rows);
    const col = random(cols);

    if (!matrix[row][col].hasBomb) {
      matrix[row][col].hasBomb = true;
      bombsLeft -= 1;
    }
  }

  return matrix;
}

/**
 * @param {import('./matrix.js').Matrix} matrix
 * @param {number} rows
 * @param {number} cols
 * @returns {import('./matrix.js').Matrix}
 */
function placeNumbers(matrix, rows, cols) {
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (row - 1 >= 0 && col - 1 >= 0 && matrix[row - 1][col - 1].hasBomb) {
        matrix[row][col].number += 1;
      }
      if (row - 1 >= 0 && matrix[row - 1][col].hasBomb) {
        matrix[row][col].number += 1;
      }
      if (row - 1 >= 0 && col + 1 < cols && matrix[row - 1][col + 1].hasBomb) {
        matrix[row][col].number += 1;
      }
      if (col - 1 >= 0 && matrix[row][col - 1].hasBomb) {
        matrix[row][col].number += 1;
      }
      if (col + 1 < cols && matrix[row][col + 1].hasBomb) {
        matrix[row][col].number += 1;
      }
      if (row + 1 < rows && col - 1 >= 0 && matrix[row + 1][col - 1].hasBomb) {
        matrix[row][col].number += 1;
      }
      if (row + 1 < rows && matrix[row + 1][col].hasBomb) {
        matrix[row][col].number += 1;
      }
      if (row + 1 < rows && col + 1 < cols && matrix[row + 1][col + 1].hasBomb) {
        matrix[row][col].number += 1;
      }
    }
  }

  return matrix;
}

/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} bombs
 * @returns {import('./matrix.js').Matrix}
 */
function generateMatrix(rows, cols, bombs) {
  /** @type {(import('./cell').Cell)[][]} */
  const matrix = [];

  for (let row = 0; row < rows; row += 1) {
    matrix[row] = [];

    for (let col = 0; col < cols; col += 1) {
      matrix[row][col] = {
        id: `cell[${row}][${col}]`,
        state: CELL_CLOSED,
        hasBomb: false,
        number: 0,
        row,
        col,
      };
    }
  }

  placeBombs(matrix, rows, cols, bombs);
  placeNumbers(matrix, rows, cols);

  return matrix;
}

export { generateMatrix };
