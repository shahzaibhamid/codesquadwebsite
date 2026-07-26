'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import CaseStudyMockup from '@/components/sections/CaseStudyMockup';
import { caseStudyMockups } from '@/data/caseStudyMockups';
import type { CaseStudy } from '@/types';

const ALL = 'All';

/** Small curated palette so a case study added via the admin panel — with no
 *  hand-authored mockup — still gets a distinct, on-brand placeholder color
 *  instead of a blank thumbnail. Picked deterministically from the slug. */
const PLACEHOLDER_ACCENTS = ['#1e3a5f', '#2f6fae', '#3f8f6e', '#8a6d3b', '#6d4aa8', '#b23b2f'];
function accentForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  return PLACEHOLDER_ACCENTS[hash % PLACEHOLDER_ACCENTS.length];
}

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
          const title = c.headline || c.desc;
          return (
            <Link className="cs-scard" href={`/case-studies/${c.slug}`} key={c.slug}>
              <div className="cs-scard__thumb">
                {c.coverImage ? (
                  <img src={c.coverImage} alt="" loading="lazy" />
                ) : mockup ? (
                  <CaseStudyMockup {...mockup} compact />
                ) : (
                  <div className="cs-scard__placeholder" style={{ background: accentForSlug(c.slug) }}>
                    <Icon name="workflow" />
                  </div>
                )}
              </div>
              <div className="cs-scard__body">
                <span className="cs-scard__tag">{c.category}</span>
                <h3>{title}</h3>
                <p className="cs-scard__client">{c.name}</p>
                <div className="cs-scard__visit"><span>Read case study</span><Icon name="arrow" /></div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
