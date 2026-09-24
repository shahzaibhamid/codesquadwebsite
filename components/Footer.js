const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 3a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c1 .3 2 .6 3 .7a2 2 0 0 1 1.7 2z" /></svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 5h18v14H3zM3 7l9 6 9-6" /></svg>
);
const platforms = [
  { n: 'OpenAI', d: 'M12 3l7 4v10l-7 4-7-4V7l7-4z M12 8v8M8.5 6.2l7 3.6M15.5 6.2l-7 3.6' },
  { n: 'Make', d: 'M4 18L8 6l4 8 4-8 4 12' },
  { n: 'HubSpot', d: 'M14 11.5l3-2.5' },
  { n: 'Google', d: 'M20 12a8 8 0 1 1-2.3-5.6 M20 12h-6.5' },
  { n: 'Meta', d: 'M4 12c0-3.3 2-5 4-5s3.5 2.2 4 5c.5 2.8 2 5 4 5s4-1.7 4-5-2-5-4-5-3.5 2.2-4 5c-.5 2.8-2 5-4 5s-4-1.7-4-5z' },
  { n: 'Salesforce', d: 'M7.5 17a3.5 3.5 0 0 1-.4-7 4.5 4.5 0 0 1 8.5-1.2A3.3 3.3 0 0 1 17 17H7.5z' },
  { n: 'Apollo', d: 'M12 5l7 13H5l7-13z' },
  { n: 'Zapier', d: 'M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9' },
];

export default function Footer() {
  return (
    <footer className="cs-footer">
      <div className="cs-container">
       <div className="cs-footer__card">
        <div className="cs-footer__grid">
          <div className="cs-footer__about">
            <a className="cs-brand" href="/">
              <img className="cs-logo" src="/logo.png" alt="CodeSquad — AI Solutions" width="190" height="44" />
            </a>
            <p>AI automation and software development agency. We build automation engines, AI agents, and custom systems that scale your business inside your existing stack.</p>
            <a className="cs-btn cs-btn--primary" href="https://calendly.com/code_squad/30min" target="_blank" rel="noopener noreferrer"><PhoneIcon /> Book a Free Call</a>
          </div>
          <div>
            <h4>Pages</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/industry">Industries</a></li>
              <li><a href="/case-studies">Case Studies</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Solutions</h4>
            <ul>
              <li><a href="/aesthetics">Patient Growth Systems</a></li>
              <li><a href="/it-engineering">Web, CRM &amp; Software</a></li>
              <li><a href="/it-engineering">AI &amp; Automation</a></li>
              <li><a href="/it-engineering">SEO · AEO · GEO</a></li>
              <li><a href="/ecommerce">Marketing Intelligence</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+13073964945"><PhoneIcon />+1 (307) 396-4945</a></li>
              <li><a href="mailto:info@codesquad.ai"><MailIcon />info@codesquad.ai</a></li>
            </ul>
          </div>
          <div>
            <h4>Offices</h4>
            <ul className="cs-footer__offices">
              <li>
                <span className="cs-office__flag">
                  <svg width="22" height="22" viewBox="0 0 24 24" role="img" aria-label="USA flag" style={{ display: 'block', borderRadius: '50%', flex: '0 0 auto' }}><defs><clipPath id="flag-clip-us"><circle cx="12" cy="12" r="12" /></clipPath></defs><g clipPath="url(#flag-clip-us)"><rect width="24" height="24" fill="#fff" /><rect y="0" width="24" height="1.846" fill="#b22234" /><rect y="3.692" width="24" height="1.846" fill="#b22234" /><rect y="7.384" width="24" height="1.846" fill="#b22234" /><rect y="11.076" width="24" height="1.846" fill="#b22234" /><rect y="14.768" width="24" height="1.846" fill="#b22234" /><rect y="18.46" width="24" height="1.846" fill="#b22234" /><rect y="22.152" width="24" height="1.846" fill="#b22234" /><rect width="10.5" height="12.922" fill="#3c3b6e" /></g><circle cx="12" cy="12" r="11.5" fill="none" stroke="rgba(0,0,0,.12)" strokeWidth="1" /></svg>
                </span>
                <span><b>USA</b><a className="cs-office__addr" href="https://www.google.com/maps/search/?api=1&query=8+The+Green+Ste+14681%2C+Dover%2C+DE+19901" target="_blank" rel="noopener noreferrer"><span>8 The Green Ste 14681</span><span>Dover, DE 19901</span></a></span>
              </li>
              <li>
                <span className="cs-office__flag">
                  <svg width="22" height="22" viewBox="0 0 24 24" role="img" aria-label="Pakistan flag" style={{ display: 'block', borderRadius: '50%', flex: '0 0 auto' }}><defs><clipPath id="flag-clip-pk"><circle cx="12" cy="12" r="12" /></clipPath></defs><g clipPath="url(#flag-clip-pk)"><rect width="24" height="24" fill="#01411c" /><rect width="6" height="24" fill="#fff" /><circle cx="14.6" cy="12" r="4.3" fill="#fff" /><circle cx="16.1" cy="11.1" r="3.6" fill="#01411c" /><path fill="#fff" d="M17.7 12.1l1.02.62-.28-1.16.9-.78-1.19-.1-.45-1.1-.45 1.1-1.19.1.9.78-.28 1.16z" /></g><circle cx="12" cy="12" r="11.5" fill="none" stroke="rgba(0,0,0,.12)" strokeWidth="1" /></svg>
                </span>
                <span><b>Pakistan</b><span>Lahore, Pakistan</span></span>
              </li>
            </ul>
          </div>
        </div>
        <div className="cs-footer__tools">
          <p className="cs-footer__tools-label">Tools &amp; platforms we work with</p>
          <ul className="cs-footer__tools-list">
            {platforms.map((p) => (
              <li key={p.n}>
                <span className="cs-platform__badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={p.d} /></svg></span>
                <span className="cs-platform__name">{p.n}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="cs-footer__bottom">
          <span>© 2026 CodeSquad. All rights reserved.</span>
          <span>Built for scale — AI automation &amp; custom software.</span>
        </div>
       </div>
      </div>
    </footer>
  );
}
