// Copy + data for /clinics (small medical clinics + dental, toggled). No markup here — see lib/patientAcquisitionPage.js.
export default {
  hero: {
    // TODO: swap for a real clinic/dental hero video when one exists — using a static photo for now
    // instead of reusing hero.mp4 (that footage is med-spa specific, wrong for this audience).
    bgVideo: null,
    bgImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=75&auto=format&fit=crop',
    tagline: 'The Growth System for Small Clinics · Dental · Wellness',
    srHeadline: 'The patient acquisition system for clinics and dental practices',
    headlinePrefix: 'The patient acquisition system for',
    typerWords: ['clinics', 'dental practices'],
    headlineSuffix: '',
    guaranteeBadge: 'Real results from a live client',
    audienceChips: [
      { img: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=120&q=70&auto=format&fit=crop', label: 'Medical Clinics' },
      { img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=120&q=70&auto=format&fit=crop', label: 'Dental' }
    ],
    guarantee: {
      leadsNum: '60',
      leadsSuffix: '+',
      leadsLabel: 'Leads generated (2 months)',
      rows: [
        { label: 'Cost per lead', value: '~$50' },
        { label: 'New patients (2 months)', value: '6–7' },
        { label: 'Lead response time', value: '3s' },
        { label: 'Automated nurture', value: '14-day' }
      ]
    }
  },


  // The flowchart's embedded sample campaign (Step 01 headline + Step 02 card) is pulled from this group.
  flowSampleGroupKey: 'dental',

  flowSamples: {
    reactivation: "Hi [First Name], it's been a while since your last visit to {Clinic Name}. We're here when you need us — book your next check-up or consult: {Booking Link}",
    blog: {
      title: "How Fast Can You Get a Same-Week Doctor's Appointment?",
      meta: "What same-week scheduling actually looks like at a small clinic, and how to book one today."
    },
    gbpPost: "New patients welcome! Same-week appointments now open — walk-ins for urgent visits, online booking for everything else. Call or book online today."
  },

  images: {
    campaignHero: null,
    campaignHeroAlt: '',
    service01: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=72&auto=format&fit=crop',
    service01Alt: 'Ads and analytics dashboard',
    service02: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=72&auto=format&fit=crop',
    service02Alt: 'Writing SEO content on a laptop'
  },

  campaigns: {
    audienceLabel: 'small medical clinics and dental practices',
    toggle: [
      { key: 'medical', label: 'Medical clinics', clinicOption: 'Medical clinic' },
      { key: 'dental', label: 'Dental', clinicOption: 'Dental practice' }
    ],
    groups: [
      {
        key: 'medical',
        samples: [
          { type: 'Local', name: 'Clinic Near Me – [City]', keywords: 'doctor near me, walk-in clinic [city], family clinic [city]', headline: 'Same-Week Appointments in [City] / Book Online', landsOn: 'Main landing page' },
          { type: 'Local', name: 'Walk-In Clinic – [Neighborhood]', keywords: 'walk-in clinic [neighborhood], clinic near [landmark], clinic open now', headline: 'Walk-Ins Welcome / Open 7 Days', landsOn: 'Main landing page' },
          { type: 'Local', name: 'Doctor Accepting Patients – [City]', keywords: 'doctor accepting new patients [city], new family doctor near me', headline: 'Now Accepting New Patients / Book Online', landsOn: 'Main landing page' },
          { type: 'Treatment', name: 'Weight Loss Program', keywords: 'medical weight loss [city], GLP-1 doctor near me', headline: 'Doctor-Supervised Weight Loss / Book a Consult', landsOn: 'Weight-loss page' },
          { type: 'Treatment', name: 'IV Therapy & Wellness', keywords: 'IV therapy [city], vitamin drip near me', headline: 'IV Hydration in 45 Minutes / Walk-Ins Welcome', landsOn: 'IV page' },
          { type: 'Treatment', name: 'Physio & Back Pain', keywords: 'back pain clinic [city], physiotherapy near me', headline: 'Back Pain Relief Without Surgery / Free Assessment', landsOn: 'Physio page' },
          { type: 'Treatment', name: 'Health Check-Ups', keywords: 'full body checkup [city], annual physical near me', headline: 'Complete Health Check / Results in 48 Hours', landsOn: 'Check-up page' },
          { type: 'Treatment', name: 'Hormone Replacement Therapy', keywords: 'hormone therapy [city], testosterone clinic near me, HRT doctor', headline: 'Feel Like Yourself Again / Free Hormone Panel', landsOn: 'Hormone Therapy page' },
          { type: 'Treatment', name: 'Pediatric & Family Care', keywords: 'family doctor [city], pediatrician near me, same-day sick visit', headline: 'Same-Day Care for the Whole Family / Book Online', landsOn: 'Family Care page' },
          { type: 'Ranking', name: 'Own "Best Clinic [City]"', keywords: 'best clinic [city], doctor reviews [city], affordable doctor [city]', headline: "[City]'s Top-Rated Family Clinic / 5★ Reviews", landsOn: 'Main page + blog' },
          { type: 'Ranking', name: 'Own "Best Weight Loss Clinic [City]"', keywords: 'best weight loss clinic [city], semaglutide cost [city], weight loss doctor reviews', headline: 'Doctor-Supervised Weight Loss / Book a Consult', landsOn: 'Weight-loss page + blog' },
          { type: 'Ranking', name: 'Own "Best Walk-In Clinic [City]"', keywords: 'best walk-in clinic [city], urgent care reviews [city], shortest wait clinic', headline: 'Short Waits, Real Doctors / Walk In Today', landsOn: 'Main page + blog' }
        ]
      },
      {
        key: 'dental',
        samples: [
          { type: 'Local', name: 'Dentist Near Me – [City]', keywords: 'dentist near me, dental clinic [city], emergency dentist [city]', headline: 'Gentle Dental Care in [City] / New Patients Welcome', landsOn: 'Main landing page' },
          { type: 'Local', name: 'Dentist – [Neighborhood]', keywords: 'dentist [neighborhood], dentist near [landmark], dental office near me', headline: 'Your Neighborhood Dentist / New Patients Welcome', landsOn: 'Main landing page' },
          { type: 'Local', name: 'Weekend Dentist – [City]', keywords: 'saturday dentist [city], dentist open weekends, evening dental appointments', headline: 'Evening & Weekend Appointments / Book Online', landsOn: 'Main landing page' },
          { type: 'Treatment', name: 'Dental Implants', keywords: 'dental implants [city], implant cost, missing tooth replacement', headline: 'Permanent Teeth in [City] / Free Implant Consult', landsOn: 'Implants page' },
          { type: 'Treatment', name: 'Invisalign & Aligners', keywords: 'invisalign [city], clear aligners near me', headline: 'Straighter Smile, No Metal / Free Smile Scan', landsOn: 'Aligners page' },
          { type: 'Treatment', name: 'Teeth Whitening & Veneers', keywords: 'teeth whitening [city], veneers cost [city]', headline: 'Whiter Teeth in One Visit / New-Patient Offer', landsOn: 'Cosmetic dental page' },
          { type: 'Treatment', name: 'Emergency Dental', keywords: 'emergency dentist near me, toothache [city]', headline: 'Same-Day Emergency Appointments / Call Now', landsOn: 'Emergency page (call-first)' },
          { type: 'Treatment', name: 'Root Canal Therapy', keywords: 'root canal [city], root canal cost, tooth pain treatment', headline: 'Pain-Free Root Canals / Same-Week Appointments', landsOn: 'Root Canal page' },
          { type: 'Treatment', name: 'Pediatric Dentistry', keywords: 'kids dentist [city], pediatric dentist near me, child dental checkup', headline: 'Gentle Dentistry for Kids / New Patient Exams', landsOn: 'Kids Dentistry page' },
          { type: 'Ranking', name: 'Own "Best Dentist [City]"', keywords: 'best dentist [city], implant specialist [city]', headline: "[City]'s Most-Reviewed Dentist / Book Today", landsOn: 'Main page + blog' },
          { type: 'Ranking', name: 'Own "Best Implant Dentist [City]"', keywords: 'best dental implants [city], implant dentist reviews, implant cost [city]', headline: 'Implants Done Right / Free Consult in [City]', landsOn: 'Implants page + blog' },
          { type: 'Ranking', name: 'Own "Best Invisalign [City]"', keywords: 'best invisalign dentist [city], invisalign cost [city], invisalign specials', headline: 'Clear Aligners From $X/mo / Free Smile Scan', landsOn: 'Aligners page + blog' }
        ]
      }
    ]
  },

  messaging: {
    variants: [
      { key: 'medical', featuredOffer: 'a free first consultation or a $X health check-up', day5Extra: 'our Weight Loss Program and IV Therapy', day8Subject: "First visit with us? Here's what to expect." },
      { key: 'dental', featuredOffer: 'a free new-patient exam and X-rays, or a free implant/smile consult', day5Extra: 'Invisalign and Teeth Whitening', day8Subject: "Nervous about the dentist? Here's how we make it easy." }
    ]
  },

  wording: {
    teamLine: 'one team that builds for clinics',
    customBuiltLine: 'custom-built for your clinic'
  },

  testimonials: {
    featureImg: 'https://qqxqwcnkyafwflxipmyn.supabase.co/storage/v1/object/public/case-study-media/1788170923372-fe725d11-6876-459d-83c9-05b87a4fb17b.webp',
    featureImgAlt: 'CareInn Dental Clinic',
    featureHeadline: 'CareInn Dental Clinic',
    featureSub: 'Live before their first patient walked in — every enquiry captured and answered from day one.',
    quotes: [
      {
        text: 'We went live with the whole system already running, so our first enquiries got an instant reply and a booking link. The schedule filled from day one.',
        initials: 'CD',
        name: 'CareInn Dental Clinic',
        role: 'Dental Care · Patient Growth'
      },
      {
        text: 'CodeSquad connected our ads, CRM and follow-up into one system. Every enquiry now gets an instant reply, and I can see the exact ad behind each booking — nothing slips through.',
        initials: 'HM',
        name: 'Harmony Med Spa',
        role: 'Sarasota, FL · Aesthetics'
      }
    ],
    spotlight: {
      name: 'GengyveUSA',
      initials: 'GU',
      desc: 'One intelligence layer unifying SEO, paid ads and review analysis for GengyveUSA — a dental-surgeon-formulated oral care brand.',
      url: 'https://gengyveusa.com'
    }
  },

  caseStudy: {
    headline: 'Harmony Med Spa, Sarasota, Florida — a full patient growth system, live today.',
    stats: [
      { val: '60<em>+</em>', lab: 'Leads (2 months)' },
      { val: '<em>~$</em>50', lab: 'Cost per lead' },
      { val: '6–7', lab: 'New patients booked' }
    ],
    intro: "We connected Google Ads, treatment-specific landing pages, a custom CRM, automated follow-up and their existing PatientNow booking into one system — with SEO content and Google Business Profile management on top.",
    decision: "we did not replace Harmony's booking system. A growth system should connect what already works, not force a migration that disrupts the clinic for months.",
    points: [
      'Treatment-specific Google Ads &amp; matching landing pages',
      'Custom CRM with full lead attribution in one view',
      '3-second automated SMS &amp; email follow-up, day or night',
      '14-day nurture that stops the moment a patient books',
      'SEO content &amp; Google Business Profile management on top'
    ],
    quote: { text: 'CodeSquad transitioned us from fragmented, manual follow-up to a fully automated system — every lead answered and tracked.', attribution: 'Hayden, Harmony Med Spa' },
    image: '/uploads/case-studies/harmony-medspa-lobby.jpg',
    imageAlt: 'Harmony Med Spa reception and waiting lounge'
  },

  contactDefault: 'Medical clinic'
};
