import { blogPosts, blogCats } from '../../lib/posts';
export const dynamic = 'force-static';
export const metadata = {
  title: 'CodeSquad Blog | AI Automation, SMEs & Business Growth',
  description: 'Practical, technical perspectives on AI automation, SMEs, AEO/SEO, lead generation, software development and scaling operations.'
};

export default function Page() {
  return (
    <main id="top">
      <section className="sec pg-hero">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">CodeSquad Blog</span>
            <h1 className="display">Insights on AI automation &amp; business growth</h1>
            <p>Practical perspectives on AI automation, SEO/AEO/GEO, lead generation and scaling.</p>
          </div>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="blog-cats reveal" id="blogCats">
            {blogCats.map((c, i) => (
              <span key={c} className={i === 0 ? 'on' : ''} data-cat={c}>{c}</span>
            ))}
          </div>
          <div className="blog-grid" id="blogGrid">
            {blogPosts.map((p) => (
              <a className="bpost reveal" href={`/blog/${p.slug}`} key={p.slug} data-cat={p.cat}>
                <span className="bthumb"><img src={p.img} alt={p.title} loading="lazy" /></span>
                <span className="bbody">
                  <span className="bmeta">{p.cat}<span className="bdate">{p.date}</span></span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="blink">Read article →</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="sec dark" id="contact">
        <div className="wrap sec-head center reveal" style={{ margin: '0 auto' }}>
          <span className="eyebrow">Ready to automate what slows you down?</span>
          <h2 className="display">Book a free 30-minute call.</h2>
          <p style={{ marginBottom: '28px' }}>We&apos;ll map one workflow you can automate and show you exactly what it takes.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://calendly.com/code_squad/30min" target="_blank" rel="noopener noreferrer" className="btn btn-blue">Book a Free Call →</a>
            <a href="/industry" className="btn btn-outline-light">Explore Industries</a>
          </div>
        </div>
      </section>
    </main>
  );
}
