const Header = () => (
  <div className="header">
    <img src="/logo.svg" alt="knightburton-logo" className="logo" title="logo" draggable={false} />
    <div>
      <p className="m0 name">Imre Kiss</p>
      <p className="m0 position">
        Software Developer at{' '}
        <a href="https://jaystack.com/" target="_blank" rel="noreferrer">
          JayStack
        </a>
      </p>
    </div>
  </div>
);

export default Header;
