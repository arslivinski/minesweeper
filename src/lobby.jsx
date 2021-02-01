import { MODE_EASY, MODE_MEDIUM, MODE_HARD } from './game_mode.js';
import './lobby.css';

/**
 * @param {LobbyProps} props
 * @returns {JSX.Element}
 */
function Lobby(props) {
  const { onModeSelected } = props;

  return (
    <div id="lobby">
      <button
        id="lobby_btn_easy"
        className="lobby__button"
        type="button"
        onClick={() => onModeSelected(MODE_EASY)}
      >
        Easy
      </button>
      <button
        id="lobby_btn_medium"
        className="lobby__button"
        type="button"
        onClick={() => onModeSelected(MODE_MEDIUM)}
      >
        Medium
      </button>
      <button
        id="lobby_btn_hard"
        className="lobby__button"
        type="button"
        onClick={() => onModeSelected(MODE_HARD)}
      >
        Hard
      </button>
    </div>
  );
}

export { Lobby };

/**
 * @typedef {Object} LobbyProps
 *    @prop {(mode: import('./game_mode.js').GameMode) => void} onModeSelected
 */
