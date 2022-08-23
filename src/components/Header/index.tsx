const Header = () => (
  <div className="header">
    <img src="/logo.svg" alt="knightburton-logo" className="logo" title="logo" draggable={false} />
    <div>
      <p className="m0 name">Imre Kiss</p>
      <p className="m0 position">
        Senior Software Engineer at{' '}
        <a href="https://www.one-beyond.com/" target="_blank" rel="noreferrer">
          One Beyond
        </a>
      </p>
    </div>
  </div>
);

export default Header;
