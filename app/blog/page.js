import { blogCats } from '../../lib/posts';
import { getPosts } from '../../lib/store';
import { postRedirects, isHiddenPost } from '../../lib/redirects.mjs';
export const revalidate = 30;
export const metadata = {
  title: 'CodeSquad Blog | AI Automation, SMEs & Business Growth',
  description: 'Practical, technical perspectives on AI automation, SMEs, AEO/SEO, lead generation, software development and scaling operations.'
};

export default async function Page() {
  const blogPosts = (await getPosts()).filter((p) => !postRedirects[p.slug] && !isHiddenPost(p));
  return (
    <main id="top">
      <section className="cs-section cs-case-section title-navy" style={{ paddingBottom: '44px' }}>
        <div className="cs-container">
          <div className="cs-heading cs-heading--center reveal">
            <h1>Insights on AI automation &amp; business growth</h1>
            <p>Practical perspectives on AI automation, SEO/AEO/GEO, lead generation and scaling.</p>
          </div>
          <div className="cs-cats" id="blogCats" role="group" aria-label="Filter articles by category">
            {blogCats.map((c, i) => (
              <button type="button" key={c} className={'cs-cat' + (i === 0 ? ' cs-cat--active' : '')} data-cat={c} aria-pressed={i === 0}>{c}</button>
            ))}
          </div>
        </div>
      </section>
      <section className="sec blog-body" style={{ paddingTop: '48px' }}>
        <div className="wrap">
          <div className="blog-grid" id="blogGrid">
            {blogPosts.map((p) => (
              <a className="bpost reveal" href={`/blog/${p.slug}`} key={p.slug} data-cat={p.cat}>
                <span className={p.img ? 'bthumb' : 'bthumb bthumb--empty'}>
                  {p.img ? <img src={p.img} alt={p.title} loading="lazy" /> : <span className="bthumb__ph" aria-hidden="true">{p.cat}</span>}
                </span>
                <span className="bbody">
                  <span className="bmeta">{p.cat}<span className="bdate">{p.date}</span></span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="blink">Read article →</span>
                </span>
              </a>
            ))}
          </div>
          <p className="blog-empty" id="blogEmpty" hidden>No articles in this category yet.</p>
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
