import AuditForm from '../../components/AuditForm';

export const metadata = {
  title: 'Free Business Growth & Booking Audit | CodeSquad',
  description: 'Answer 7 quick questions to help us identify where your business may be losing leads, bookings, and growth opportunities.'
};

const CLIENT_PATH = [
  { stage: 'Someone looks for what you offer', leak: "You don't show up enough on Google" },
  { stage: 'They send an inquiry', leak: 'Calls get missed or replies come too slowly' },
  { stage: 'Your team follows up', leak: 'The lead goes quiet and never books' },
  { stage: 'They book an appointment' }
];

export default function InquiryPage() {
  return (
    <main id="top">
      <section className="sec dark inq-sec" id="contact">
        <div className="wrap audit-hero">
          <div className="audit-hero__head">
            <p className="audit-hero__kicker">Free Business Growth &amp; Booking Audit</p>
            <h1 className="audit-hero__title">Are You Losing Potential Clients Without Knowing It?</h1>
            <p className="audit-hero__lead">Getting inquiries is one thing. Turning them into booked appointments is another.</p>
          </div>

          <div className="audit-hero__form">
            <AuditForm />
          </div>

          <div className="audit-hero__path">
            <h2 className="audit-path__title">Where clients slip away</h2>
            <ol className="audit-path">
              {CLIENT_PATH.map(({ stage, leak }) => (
                <li key={stage} className="audit-path__stage">
                  <span className="audit-path__name">{stage}</span>
                  {leak ? <span className="audit-path__leak">{leak}</span> : null}
                </li>
              ))}
            </ol>
            <p className="audit-alt">
              Prefer to talk now? Call <a href="tel:+13073964945">+1 (307) 396-4945</a>, email <a href="mailto:info@codesquad.ai">info@codesquad.ai</a>, or <a href="https://calendly.com/code_squad/30min" target="_blank" rel="noopener">book on Calendly</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
