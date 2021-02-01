import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Game } from './game.jsx';
import './main.css';

render(
  <StrictMode>
    <Game />
  </StrictMode>,
  document.getElementById('root'),
);
