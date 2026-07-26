'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import CaseStudyMockup from '@/components/sections/CaseStudyMockup';
import { caseStudyMockups } from '@/data/caseStudyMockups';
import type { CaseStudy } from '@/types';

const ALL = 'All';

export default function CaseStudiesGrid({ items, industries }: { items: CaseStudy[]; industries: string[] }) {
  const [tab, setTab] = useState<string>(ALL);
  const tabs = [ALL, ...industries];
  const visible = tab === ALL ? items : items.filter((item) => item.vertical === tab);

  return (
    <>
      <div className="cs-cats" role="list" aria-label="Case study categories">
        {tabs.map((t) => (
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
        {visible.map((c) => {
          const mockup = caseStudyMockups[c.slug];
          return (
            <Link className="cs-case" href={`/case-studies/${c.slug}`} key={c.slug}>
              <div className="cs-case__thumb">
                {c.coverImage ? (
                  <img src={c.coverImage} alt="" loading="lazy" />
                ) : mockup ? (
                  <CaseStudyMockup {...mockup} compact />
                ) : null}
              </div>
              <span className="cs-case__tag">{c.category}</span>
              <h3>{c.name}</h3>
              {c.headlineMetric && <div className="cs-case__metric">{c.headlineMetric}</div>}
              <div className="cs-case__bottom">
                <div className="cs-case__visit"><span>Read case study</span><Icon name="arrow" /></div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
