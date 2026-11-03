// DRAFT: review this text and replace every [bracketed placeholder]. When it's
// final, remove the note below and the robots rule so the page can be indexed.
export const metadata = {
  title: 'Privacy Policy | CodeSquad',
  description: 'How CodeSquad collects and uses the information you share through this website.',
  robots: { index: false }
};

export default function PrivacyPage() {
  return (
    <main id="top">
      <section className="sec dark inq-sec">
        <div className="wrap">
          <h1 className="display">Privacy Policy</h1>
          <p className="lead">Effective date: [effective date]</p>
        </div>
      </section>
      <section className="sec">
        <div className="wrap privacy-body">
          <p className="privacy-note"><strong>Draft.</strong> This policy is awaiting final review.</p>

          <p>This policy explains how [legal entity name] (&quot;CodeSquad&quot;, &quot;we&quot;) handles information collected through this website.</p>

          <h2>What we collect</h2>
          <ul>
            <li><strong>Contact details:</strong> your name, business name, business email, phone number and, if you provide it, your business website or Instagram profile.</li>
            <li><strong>Audit answers:</strong> your responses about your business, role, marketing, follow-up process, budget and timeline.</li>
            <li><strong>Website usage data:</strong> information collected by analytics and advertising tags, such as the pages you visit and how you reached our site.</li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To review your audit request and contact you about it by phone or email.</li>
            <li>To discuss potential improvements to your advertising, lead follow-up and appointment booking.</li>
            <li>To understand how our website and advertising perform.</li>
          </ul>

          <h2>Services we use</h2>
          <ul>
            <li><strong>Supabase</strong> stores the information you submit through our forms.</li>
            <li><strong>Google Tag Manager</strong> loads analytics and advertising tags on this website.</li>
            <li><strong>Calendly</strong> handles bookings if you choose to schedule a call. Its own privacy policy applies to what you enter there.</li>
          </ul>

          <h2>How long we keep it</h2>
          <p>[Retention period and criteria.]</p>

          <h2>Your choices</h2>
          <p>You can ask us to access, correct or delete your information, or to stop contacting you, using the details below.</p>

          <h2>Contact us</h2>
          <p>[Legal entity name], J2 Johar Town, Lahore<br />
            Email: <a href="mailto:info@codesquad.ai">info@codesquad.ai</a><br />
            Phone: <a href="tel:+13073964945">+1 (307) 396-4945</a></p>
        </div>
      </section>
    </main>
  );
}
