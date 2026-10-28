export default function Header() {
  return (
    <header id="header">
      <div className="wrap nav">
        <a href="/" className="logo" aria-label="CodeSquad">
          <img className="logo-on-light" src="/logo.png" alt="CodeSquad — AI Solutions" width="190" height="41" />
          <img className="logo-on-dark" src="/logo-dark.png" alt="CodeSquad — AI Solutions" width="190" height="35" />
        </a>
        <nav className="nav-links" id="navLinks">
          <div className="nav-center">
            <a href="/">Home</a>
            <a href="/founder">Founder</a>
            <div className="nav-drop">
              <a href="/#capabilities" className="nav-drop-toggle">Services <span className="car">▾</span></a>
              <div className="nav-menu">
                <a href="/services/ai-automation">AI &amp; Automation</a>
                <a href="/services/websites-software">Websites &amp; Software</a>
                <a href="/services/crm-integration">CRM &amp; Dashboards</a>
                <a href="/services/seo-geo-aeo">SEO · AEO · GEO</a>
                <a href="/services/marketing-intelligence">Marketing Intelligence</a>
              </div>
            </div>
            <div className="nav-drop">
              <a href="/industry" className="nav-drop-toggle">Industries <span className="car">▾</span></a>
              <div className="nav-menu">
                <a href="https://medgrow.codesquad.ai/" target="_blank" rel="noopener noreferrer">Healthcare &amp; Wellness</a>
                <a href="/it-engineering">IT &amp; Engineering</a>
                <a href="/ecommerce">E-commerce</a>
              </div>
            </div>
            <a href="/case-studies">Case Studies</a>
            <a href="/blog">Blog</a>
          </div>
          <div className="nav-cta">
            <a href="/inquiry" className="btn btn-ghost nav-inquiry">Inquiry Form</a>
            <a href="https://calendly.com/code_squad/30min" target="_blank" rel="noopener noreferrer" className="btn btn-dark">Book a Free Call</a>
          </div>
        </nav>
        <button className="menu-btn" id="menuBtn" aria-label="Menu">☰</button>
      </div>
    </header>
  );
}
