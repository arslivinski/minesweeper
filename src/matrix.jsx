import clsx from 'clsx';
import { Cell } from './cell.jsx';
import { MODE_EASY, MODE_MEDIUM, MODE_HARD } from './game_mode.js';
import './matrix.css';

/**
 * @param {MatrixProps} props
 * @returns {JSX.Element}
 */
function Matrix(props) {
  const { matrix, mode, gameState, onCellLeftClick, onCellRightClick } = props;

  /**
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} event
   */
  function handleContextMenu(event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  const classNames = clsx('matrix', {
    'matrix--easy': mode === MODE_EASY,
    'matrix--medium': mode === MODE_MEDIUM,
    'matrix--hard': mode === MODE_HARD,
  });

  return (
    <div className={classNames} onContextMenu={handleContextMenu}>
      {matrix.flatMap((/** @type {import('./cell').Cell[]} */ row) => {
        return row.map((cell) => {
          return (
            <Cell
              key={cell.id}
              cell={cell}
              gameState={gameState}
              onLeftClick={onCellLeftClick}
              onRightClick={onCellRightClick}
            />
          );
        });
      })}
    </div>
  );
}

export { Matrix };

/**
 * @typedef {import('./cell').Cell[][]} Matrix
 */

/**
 * @typedef {Object} MatrixProps
 *    @prop {Matrix} matrix
 *    @prop {import('./game_mode.js').GameMode} mode
 *    @prop {import('./game_state.js').GameState} gameState
 *    @prop {(row: number, col: number) => void} onCellLeftClick
 *    @prop {(row: number, col: number) => void} onCellRightClick
 */
