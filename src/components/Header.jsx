function Header() {
  return (
    <header className="header">
      {/* Tiny keyboard icon, just made of CSS boxes */}
      <div className="header-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <h1 className="header-title">TouchType</h1>
      <p className="header-tagline">Touch typing practice</p>
      <div className="header-divider"></div>
    </header>
  )
}

export default Header
