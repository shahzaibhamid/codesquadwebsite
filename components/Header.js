import { services } from '../lib/services';

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
          <a href="/founder">About</a>
          <div className="nav-drop">
            <a href="/#capabilities" className="nav-drop-toggle">Services <span className="car">▾</span></a>
            <div className="nav-menu">
              {services.map((s) => (
                <a key={s.slug} href={`/services/${s.slug}`}>{s.title}</a>
              ))}
            </div>
          </div>
          <div className="nav-drop">
            <a href="/industry" className="nav-drop-toggle">Industries <span className="car">▾</span></a>
            <div className="nav-menu">
              <a href="/it-engineering">IT &amp; Engineering</a>
              <a href="/ecommerce">E-commerce</a>
              <a href="/industries/healthcare">Healthcare</a>
            </div>
          </div>
          <a href="/process">Process</a>
          <a href="/case-studies">Case Studies</a>
          <a href="/blog">Blog</a>
          <a href="https://medgrow.codesquad.ai/" target="_blank" rel="noopener noreferrer">MedGrow ↗</a>
          <a href="/inquiry" className="btn btn-ghost nav-inquiry">Inquiry Form</a>
          <a href="https://calendly.com/code_squad/30min" target="_blank" rel="noopener noreferrer" className="btn btn-dark">Book a Free Call</a>
        </nav>
        <button className="menu-btn" id="menuBtn" aria-label="Menu">☰</button>
      </div>
    </header>
  );
}
