import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Game } from './game.jsx';

render(
  <StrictMode>
    <Game />
  </StrictMode>,
  document.getElementById('root'),
);
