// Copy + data for /industries/healthcare (med spas, clinics and dental — merged from the former
// /aesthetics and /clinics pages). No markup here — see lib/patientAcquisitionPage.js for rendering.
import aesthetics from './aesthetics.config';
import clinics from './clinics.config';

export default {
  hero: {
    ...aesthetics.hero,
    tagline: 'The Growth System for Healthcare · Med Spas · Clinics · Dental',
    typerWords: ['med spas', 'aesthetic clinics', 'clinics', 'dental practices'],
    sub: 'Treatment-based and local Google Ads, instant follow-up and booking in one system for med spas, clinics, and dental practices — built into the software you already use.',
    reframe: 'One of the industries we serve — the same Patient Growth System, configured for how healthcare actually books.',
    audienceChips: [
      aesthetics.hero.audienceChips[0],
      aesthetics.hero.audienceChips[1],
      clinics.hero.audienceChips[0],
      clinics.hero.audienceChips[1]
    ]
  },

  images: aesthetics.images,

  whyUs: {
    title: 'Tired of agencies that have never run a clinic?',
    intro: aesthetics.whyUs.intro,
    points: [
      { ...aesthetics.whyUs.points[0], title: 'Booked patients, not clicks', text: 'Every booking traced to the exact ad and keyword behind it. No vanity metrics.' },
      { ...aesthetics.whyUs.points[1], title: 'No switching software', text: 'We build into the booking and practice-management system you already use. No migration, no retraining the front desk.' },
      { ...aesthetics.whyUs.points[2], title: 'Built for healthcare', text: 'Three years with healthcare brands: treatment-based campaigns, check-ups, implants, aligners and urgent visits, all run within health-advertising rules from day one.' }
    ]
  },

  faqs: [
    ...aesthetics.faqs.slice(0, -1),
    { q: aesthetics.faqs[aesthetics.faqs.length - 1].q, a: 'Med spas, aesthetic and laser clinics, cosmetic dermatology, dental practices, family and walk-in clinics, physiotherapy, weight-loss and wellness clinics.' }
  ],

  // Harmony Med Spa + CareInn Dental Clinic
  proofQuotes: clinics.proofQuotes,

  caseStudy: aesthetics.caseStudy,

  contactDefault: aesthetics.contactDefault
};
