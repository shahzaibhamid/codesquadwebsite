export default function CaseStudyInstructions() {
  return (
    <aside className="cs-case-guide" aria-labelledby="case-study-guide-title">
      <div className="cs-case-guide__head">
        <span className="cs-case-guide__icon" aria-hidden="true">i</span>
        <div>
          <h2 id="case-study-guide-title">How to add a case study</h2>
          <p>Use this guide to make every section render correctly. Long-form fields have no word or character limit.</p>
        </div>
      </div>
      <div className="cs-case-guide__grid">
        <div><strong>1. Basic information</strong><p>Add the client name, website, industry, services, summary, and a URL-friendly slug.</p></div>
        <div><strong>2. Write the story</strong><p>Complete the kicker, headline, challenge, solution, implementation, results, and conclusion fields.</p></div>
        <div><strong>3. Use the line format</strong><p><code>Title | Description</code> for metrics, implementation, and results. Add one item on each line.</p></div>
        <div><strong>4. Add capabilities</strong><p><code>Heading | Item one, Item two</code>. Separate capability items with commas.</p></div>
        <div><strong>5. Place media precisely</strong><p>Choose Start, End, or “Between text.” For between text, write <code>#IMAGE#</code> on its own line where the next media item should appear.</p></div>
        <div><strong>6. Review and publish</strong><p>Use only verified figures, preview the page, choose its display order, then enable Published.</p></div>
      </div>
      <div className="cs-case-guide__example"><b>Image placement</b><code>First paragraph…<br />#IMAGE#<br />Next paragraph…</code><b>Example metric</b><code>≈ 60 sec | First response</code></div>
    </aside>
  );
}
