// The Growth Audit questions, shared by the form and the server action so both
// accept exactly the same answers. Keep ids stable: they are the form field names
// and are saved with each lead.
export const AUDIT_QUESTIONS = [
  {
    id: 'businessType',
    question: 'What type of business do you operate?',
    options: ['Med Spa / Aesthetic Clinic', 'Medical / Dental Clinic', 'Beauty / Hair Salon', 'Wellness / Laser Studio', 'Other Business']
  },
  {
    id: 'role',
    question: 'What is your role in the business?',
    options: ['Owner / Co-owner', 'Founder / CEO', 'Practice Manager / Decision-maker', 'Marketing Manager', 'Employee / Not a decision-maker', 'I am looking for a treatment or service']
  },
  {
    id: 'challenge',
    question: "What's your biggest challenge with getting more bookings?",
    options: ['Not getting enough new inquiries', "Getting leads, but they don't book", 'Missing calls or following up too slowly', 'Not showing up enough on Google', 'Spending on ads without clear results', 'Need a complete marketing system']
  },
  {
    id: 'clientSource',
    question: 'Where do most of your new clients currently come from?',
    options: ['Google Search / Google Maps', 'Facebook / Instagram', 'Paid advertising', 'Referrals / Word of mouth', "We don't have a consistent source"]
  },
  {
    id: 'responseTime',
    question: 'How quickly does your team respond to a new inquiry?',
    options: ['Within 5 minutes', 'Within 5–30 minutes', 'Within a few hours', 'Usually the next day', "We don't have a proper follow-up system"]
  },
  {
    id: 'budget',
    question: 'What monthly budget could your business invest in marketing and advertising combined?',
    options: ['Under $1,000', '$1,000–$2,499', '$2,500–$4,999', '$5,000+', 'Not decided yet']
  },
  {
    id: 'timeline',
    question: 'When would you like to improve your marketing and booking system?',
    options: ['Immediately / Within 30 days', 'Within 1–3 months', 'Within 3–6 months', 'Just exploring options']
  }
];

const LOW_INTENT_ROLES = {
  'I am looking for a treatment or service': 'Consumer',
  'Employee / Not a decision-maker': 'Not a decision-maker'
};

// The dashboard tag for respondents who aren't buyers, or null for everyone else.
export const getLowIntentTag = (role) => LOW_INTENT_ROLES[role] || null;
