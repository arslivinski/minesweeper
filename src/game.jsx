import { useReducer } from 'react';
import { CELL_CLOSED, CELL_FLAGGED, CELL_QUESTION, CELL_OPEN } from './cell_state.js';
import {
  ACTION_CELL_LEFT_CLICKED,
  ACTION_CELL_RIGHT_CLICKED,
  ACTION_GAME_STARTED,
  ACTION_GAME_RESET,
} from './game_action.js';
import { MODE_EASY, MODE_MEDIUM, MODE_HARD } from './game_mode.js';
import { GAME_START, GAME_RUNNING, GAME_OVER } from './game_state.js';
import { generateMatrix } from './generateMatrix.js';
import { Header } from './header.jsx';
import { Lobby } from './lobby.jsx';
import { Matrix } from './matrix.jsx';
import './game.css';

const modeState = {
  [MODE_EASY]: {
    mode: MODE_EASY,
    rows: 9,
    cols: 9,
    bombs: 10,
  },
  [MODE_MEDIUM]: {
    mode: MODE_MEDIUM,
    rows: 16,
    cols: 16,
    bombs: 40,
  },
  [MODE_HARD]: {
    mode: MODE_HARD,
    rows: 16,
    cols: 30,
    bombs: 99,
  },
};

/** @type {State} */
const initialState = { gameState: GAME_START };

/**
 * @param {State} state
 * @param {{ type: import('./game_action.js').Action, payload: any }} action
 * @returns {State}
 */
function reducer(state, action) {
  switch (action.type) {
    case ACTION_GAME_STARTED: {
      /** @type {State} */
      const newState = {
        gameState: GAME_RUNNING,
        flagsUsed: 0,
        duration: 0,
        ...modeState[action.payload],
      };

      newState.matrix = generateMatrix(newState.rows, newState.cols, newState.bombs);

      return newState;
    }
    case ACTION_GAME_RESET: {
      return { gameState: GAME_START };
    }
    case ACTION_CELL_LEFT_CLICKED: {
      if (state.gameState !== GAME_RUNNING) {
        return state;
      }

      const { row, col } = action.payload;
      const newState = { ...state };
      newState.matrix = [...newState.matrix];
      newState.matrix[row] = [...newState.matrix[row]];
      newState.matrix[row][col] = { ...newState.matrix[row][col] };
      const cell = newState.matrix[row][col];

      if (cell.state === CELL_CLOSED && cell.hasBomb) {
        newState.gameState = GAME_OVER;
        cell.state = CELL_OPEN;
      }
      if (cell.state === CELL_CLOSED && !cell.hasBomb) {
        cell.state = CELL_OPEN;
        const cells = [cell];

        while (cells.length > 0) {
          const currentCell = cells.shift();

          if (
            currentCell.row - 1 >= 0
            && currentCell.col - 1 >= 0
            && newState.matrix[currentCell.row - 1][currentCell.col - 1].state === CELL_CLOSED
            && !newState.matrix[currentCell.row - 1][currentCell.col - 1].hasBomb
          ) {
            newState.matrix[currentCell.row - 1][currentCell.col - 1].state = CELL_OPEN;
            if (newState.matrix[currentCell.row - 1][currentCell.col - 1].number === 0) {
              cells.push(newState.matrix[currentCell.row - 1][currentCell.col - 1]);
            }
          }

          if (
            currentCell.row - 1 >= 0
            && newState.matrix[currentCell.row - 1][currentCell.col].state === CELL_CLOSED
            && !newState.matrix[currentCell.row - 1][currentCell.col].hasBomb
          ) {
            newState.matrix[currentCell.row - 1][currentCell.col].state = CELL_OPEN;
            if (newState.matrix[currentCell.row - 1][currentCell.col].number === 0) {
              cells.push(newState.matrix[currentCell.row - 1][currentCell.col]);
            }
          }

          if (
            currentCell.row - 1 >= 0
            && currentCell.col + 1 < newState.cols
            && newState.matrix[currentCell.row - 1][currentCell.col + 1].state === CELL_CLOSED
            && !newState.matrix[currentCell.row - 1][currentCell.col + 1].hasBomb
          ) {
            newState.matrix[currentCell.row - 1][currentCell.col + 1].state = CELL_OPEN;
            if (newState.matrix[currentCell.row - 1][currentCell.col + 1].number === 0) {
              cells.push(newState.matrix[currentCell.row - 1][currentCell.col + 1]);
            }
          }

          if (
            currentCell.col - 1 >= 0
            && newState.matrix[currentCell.row][currentCell.col - 1].state === CELL_CLOSED
            && !newState.matrix[currentCell.row][currentCell.col - 1].hasBomb
          ) {
            newState.matrix[currentCell.row][currentCell.col - 1].state = CELL_OPEN;
            if (newState.matrix[currentCell.row][currentCell.col - 1].number === 0) {
              cells.push(newState.matrix[currentCell.row][currentCell.col - 1]);
            }
          }

          if (
            currentCell.col + 1 < newState.cols
            && newState.matrix[currentCell.row][currentCell.col + 1].state === CELL_CLOSED
            && !newState.matrix[currentCell.row][currentCell.col + 1].hasBomb
          ) {
            newState.matrix[currentCell.row][currentCell.col + 1].state = CELL_OPEN;
            if (newState.matrix[currentCell.row][currentCell.col + 1].number === 0) {
              cells.push(newState.matrix[currentCell.row][currentCell.col + 1]);
            }
          }

          if (
            currentCell.row + 1 < newState.rows
            && currentCell.col - 1 >= 0
            && newState.matrix[currentCell.row + 1][currentCell.col - 1].state === CELL_CLOSED
            && !newState.matrix[currentCell.row + 1][currentCell.col - 1].hasBomb
          ) {
            newState.matrix[currentCell.row + 1][currentCell.col - 1].state = CELL_OPEN;
            if (newState.matrix[currentCell.row + 1][currentCell.col - 1].number === 0) {
              cells.push(newState.matrix[currentCell.row + 1][currentCell.col - 1]);
            }
          }

          if (
            currentCell.row + 1 < newState.rows
            && newState.matrix[currentCell.row + 1][currentCell.col].state === CELL_CLOSED
            && !newState.matrix[currentCell.row + 1][currentCell.col].hasBomb
          ) {
            newState.matrix[currentCell.row + 1][currentCell.col].state = CELL_OPEN;
            if (newState.matrix[currentCell.row + 1][currentCell.col].number === 0) {
              cells.push(newState.matrix[currentCell.row + 1][currentCell.col]);
            }
          }

          if (
            currentCell.row + 1 < newState.rows
            && currentCell.col + 1 < newState.cols
            && newState.matrix[currentCell.row + 1][currentCell.col + 1].state === CELL_CLOSED
            && !newState.matrix[currentCell.row + 1][currentCell.col + 1].hasBomb
          ) {
            newState.matrix[currentCell.row + 1][currentCell.col + 1].state = CELL_OPEN;
            if (newState.matrix[currentCell.row + 1][currentCell.col + 1].number === 0) {
              cells.push(newState.matrix[currentCell.row + 1][currentCell.col + 1]);
            }
          }
        }
      }

      return newState;
    }
    case ACTION_CELL_RIGHT_CLICKED: {
      if (state.gameState !== GAME_RUNNING) {
        return state;
      }

      const { row, col } = action.payload;
      const newState = { ...state };
      newState.matrix = [...newState.matrix];
      newState.matrix[row] = [...newState.matrix[row]];
      newState.matrix[row][col] = { ...newState.matrix[row][col] };
      const cell = newState.matrix[row][col];

      if (cell.state === CELL_CLOSED && state.flagsUsed < state.bombs) {
        cell.state = CELL_FLAGGED;
        state.flagsUsed += 1;
      } else if (cell.state === CELL_FLAGGED) {
        cell.state = CELL_QUESTION;
        state.flagsUsed -= 1;
      } else if (cell.state === CELL_QUESTION) {
        cell.state = CELL_CLOSED;
      }

      // TODO: Win condition

      return newState;
    }
    default: {
      return { ...state };
    }
  }
}

function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * @param {import('./game_mode.js').GameMode} mode
   */
  function handleModeSelected(mode) {
    dispatch({
      type: ACTION_GAME_STARTED,
      payload: mode,
    });
  }

  function handleReset() {
    dispatch({ type: ACTION_GAME_RESET });
  }

  /**
   * @param {number} row
   * @param {number} col
   */
  function handleCellLeftClick(row, col) {
    dispatch({
      type: ACTION_CELL_LEFT_CLICKED,
      payload: {
        row,
        col,
      },
    });
  }

  /**
   * @param {number} row
   * @param {number} col
   */
  function handleCellRightClick(row, col) {
    dispatch({
      type: ACTION_CELL_RIGHT_CLICKED,
      payload: {
        row,
        col,
      },
    });
  }

  let content;
  if (state.gameState === GAME_START) {
    content = (
      <Lobby onModeSelected={handleModeSelected} />
    );
  } else {
    content = (
      <>
        <Header flagsLeft={state.bombs - state.flagsUsed} onReset={handleReset} />
        <Matrix
          matrix={state.matrix}
          mode={state.mode}
          gameState={state.gameState}
          onCellLeftClick={handleCellLeftClick}
          onCellRightClick={handleCellRightClick}
        />
      </>
    );
  }

  return (
    <div className="game">
      {content}
    </div>
  );
}

export { Game };

/**
 * @typedef {Object} State
 *    @prop {import('./game_state.js').GameState} gameState
 *    @prop {import('./game_mode.js').GameMode} mode
 *    @prop {number} rows
 *    @prop {number} cols
 *    @prop {number} bombs
 *    @prop {number} flagsUsed
 *    @prop {number} duration
 *    @prop {import('./matrix.js').Matrix} matrix
 */
