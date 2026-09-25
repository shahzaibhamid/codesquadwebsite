export default function Header() {
  return (
    <header id="header">
      <div className="wrap nav">
        <a href="/" className="logo" aria-label="CodeSquad">
          <img className="logo-on-light" src="/logo.png" alt="CodeSquad — AI Solutions" width="190" height="41" />
          <img className="logo-on-dark" src="/logo-dark.png" alt="CodeSquad — AI Solutions" width="190" height="35" />
        </a>
        <nav className="nav-links" id="navLinks">
          <a href="/">Home</a>
          <div className="nav-drop">
            <a href="/industry" className="nav-drop-toggle">Industry <span className="car">▾</span></a>
            <div className="nav-menu">
              <a href="/aesthetics">Aesthetics / Med Spa</a>
              <a href="/clinics">Clinics &amp; Dental</a>
              <a href="/it-engineering">IT &amp; Engineering</a>
              <a href="/ecommerce">E-commerce</a>
            </div>
          </div>
          <a href="/case-studies">Case Studies</a>
          <a href="/blog">Blog</a>
          <a href="/#contact">Contact</a>
          <a href="https://calendly.com/code_squad/30min" target="_blank" rel="noopener noreferrer" className="btn btn-dark">Book a Free Call</a>
        </nav>
        <button className="menu-btn" id="menuBtn" aria-label="Menu">☰</button>
      </div>
    </header>
  );
}
