import clsx from 'clsx';
import { CELL_FLAGGED, CELL_QUESTION, CELL_OPEN } from './cell_state.js';
import { GAME_RUNNING, GAME_OVER } from './game_state.js';
import './cell.css';

const LEFT_BUTTON = 0;
const RIGHT_BUTTON = 2;

/**
 * @param {CellProps} props
 * @returns {JSX.Element}
 */
function Cell(props) {
  const { cell, gameState, onLeftClick, onRightClick } = props;

  /**
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} event
   */
  function handleMouseUp(event) {
    if (event.button === LEFT_BUTTON) {
      onLeftClick(cell.row, cell.col);
    } else if (event.button === RIGHT_BUTTON) {
      onRightClick(cell.row, cell.col);
    }
  }

  const classNames = clsx('cell', {
    'cell--flag': cell.state === CELL_FLAGGED && (gameState === GAME_RUNNING || !cell.hasBomb),
    'cell--flagged': cell.state === CELL_FLAGGED && cell.hasBomb && gameState !== GAME_RUNNING,
    'cell--question': cell.state === CELL_QUESTION,
    'cell--open': cell.state === CELL_OPEN,
    'cell--explosion': cell.state === CELL_OPEN && cell.hasBomb,
    'cell--bomb': cell.state !== CELL_FLAGGED && cell.hasBomb && gameState === GAME_OVER,
  });

  return (
    <div className={classNames} onMouseUp={handleMouseUp}>
      {cell.state === CELL_OPEN && cell.number > 0 && !cell.hasBomb ? cell.number : ''}
    </div>
  );
}

export { Cell };

/**
 * @typedef {Object} Cell
 *    @prop {string} id
 *    @prop {number} row
 *    @prop {number} col
 *    @prop {boolean} hasBomb
 *    @prop {number} number
 *    @prop {import('./cell_state.js').CellState} state
 */

/**
 * @typedef {Object} CellProps
 *    @prop {Cell} cell
 *    @prop {import('./game_state.js').GameState} gameState
 *    @prop {(row: number, col: number) => void} onLeftClick
 *    @prop {(row: number, col: number) => void} onRightClick
 */
