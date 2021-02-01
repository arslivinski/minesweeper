import './header.css';

/**
 * @param {HeaderProps} props
 * @returns {JSX.Element}
 */
function Header(props) {
  const { flagsLeft, onReset } = props;

  return (
    <div className="header">
      <span>🚩 {flagsLeft}</span>
      <button type="button" onClick={onReset}>🔄</button>
    </div>
  );
}

export { Header };

/**
 * @typedef {Object} HeaderProps
 *    @prop {number} flagsLeft
 *    @prop {() => void} onReset
 */
