'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import type { CaseStudy } from '@/types';

const TABS = ['All', 'Healthcare & Clinics', 'E-commerce'] as const;
type Tab = (typeof TABS)[number];

export default function CaseStudiesGrid({ items }: { items: CaseStudy[] }) {
  const [tab, setTab] = useState<Tab>('All');
  const visible = tab === 'All' ? items : items.filter((item) => item.vertical === tab);

  return (
    <>
      <div className="cs-cats" role="list" aria-label="Case study categories">
        {TABS.map((t) => (
          <button
            type="button"
            key={t}
            className={`cs-cat${tab === t ? ' cs-cat--active' : ''}`}
            role="listitem"
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="cs-case-grid">
        {visible.map((c) => (
          <Link className="cs-case" href={`/case-studies/${c.slug}`} key={c.slug}>
            <span className="cs-case__tag">{c.category}</span>
            <h3>{c.name}</h3>
            {c.headlineMetric && <div className="cs-case__metric">{c.headlineMetric}</div>}
            <div className="cs-case__bottom">
              <div className="cs-case__visit"><span>Read case study</span><Icon name="arrow" /></div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
