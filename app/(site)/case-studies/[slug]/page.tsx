import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import { getCaseStudies, getCaseStudy } from '@/lib/caseStudies';
import { site } from '@/data/site';
import CaseStudyHero from '@/components/sections/CaseStudyHero';

type PageProps = { params: { slug: string } };

function pairs(value?: string): Array<[string, string]> {
  return (value || '').split(/\r?\n/).map((line) => line.trim()).filter((line) => Boolean(line) && line.toUpperCase() !== '#IMAGE#').map((line) => {
    const [title, ...body] = line.split('|');
    return [title.trim(), body.join('|').trim()] as [string, string];
  });
}

function markerMedia(value: string | undefined, links: string[] | undefined, position: number): string | undefined {
  if (!value?.toUpperCase().includes('#IMAGE#') || !links?.length) return undefined;
  let contentItems = 0;
  let mediaIndex = 0;
  for (const rawLine of value.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.toUpperCase() === '#IMAGE#') {
      if (contentItems === position) return links[mediaIndex];
      mediaIndex++;
    } else contentItems++;
  }
  return undefined;
}

function markerCount(value?: string): number {
  return value?.match(/#IMAGE#/gi)?.length || 0;
}

function youtubeEmbed(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    const id = parsed.hostname.includes('youtu.be') ? parsed.pathname.slice(1) : parsed.searchParams.get('v');
    return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : undefined;
  } catch { return undefined; }
}

function mediaHost(url: string): string {
  try { return new URL(url, 'https://codesquad.ai').hostname.replace(/^www\./, '') || 'Project resource'; }
  catch { return 'Project resource'; }
}

function MediaItem({ url, name }: { url: string; name: string }) {
  const embed = youtubeEmbed(url);
  const clean = url.split('?')[0].toLowerCase();
  if (embed) return <iframe src={embed} title={`${name} video`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />;
  if (/\.(mp4|webm|ogg)$/.test(clean)) return <video src={url} controls preload="metadata" />;
  if (/\.(png|jpe?g|webp|gif|svg|avif)$/.test(clean)) return <img src={url} alt={`${name} project media`} loading="lazy" />;
  return <a className="cs-study-media__link" href={url} target="_blank" rel="noopener noreferrer"><span className="cs-study-media__link-copy"><small>External resource</small><strong>Open project media</strong><em>{mediaHost(url)}</em></span><span className="cs-study-media__link-arrow"><Icon name="arrow-ur" /></span></a>;
}

function narrativeParagraphs(text: string, hasMedia: boolean): string[] {
  const explicit = text.split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean);
  if (explicit.length > 1 || !hasMedia) return explicit;
  const sentences = text.trim().split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length < 2) return explicit;
  const middle = Math.ceil(sentences.length / 2);
  return [sentences.slice(0, middle).join(' '), sentences.slice(middle).join(' ')];
}

function NarrativeWithMedia({ text, links, name, dark = false }: { text: string; links?: string[]; name: string; dark?: boolean }) {
  if (links?.length && text.toUpperCase().includes('#IMAGE#')) {
    const segments = text.split(/#IMAGE#/gi);
    return <div className={`cs-study-narrative${dark ? ' cs-study-narrative--dark' : ''}`}>{segments.map((segment, index) => <div key={`${index}-${segment.slice(0, 18)}`}>{segment.trim() && segment.trim().split(/\n\s*\n/).map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph.trim()}</p>)}{index < segments.length - 1 && links[index] && <div className="cs-study-inline-media"><MediaItem url={links[index]} name={name} /></div>}</div>)}{links.slice(segments.length - 1).map((url) => <div className="cs-study-inline-media" key={url}><MediaItem url={url} name={name} /></div>)}</div>;
  }
  const paragraphs = narrativeParagraphs(text, !!links?.length);
  return <div className={`cs-study-narrative${dark ? ' cs-study-narrative--dark' : ''}`}>{paragraphs.map((paragraph, index) => <div key={`${index}-${paragraph.slice(0, 18)}`}><p>{paragraph}</p>{links?.[index] && <div className="cs-study-inline-media"><MediaItem url={links[index]} name={name} /></div>}</div>)}{links?.slice(paragraphs.length).map((url) => <div className="cs-study-inline-media" key={url}><MediaItem url={url} name={name} /></div>)}</div>;
}

function MediaGrid({ links, name, dark = false }: { links?: string[]; name: string; dark?: boolean }) {
  if (!links?.length) return null;
  return <div className={`cs-study-media__grid${links.length === 1 ? ' cs-study-media__grid--single' : ''}${dark ? ' cs-study-media__grid--dark' : ''}`}>{links.map((url) => {
    return <MediaItem key={url} url={url} name={name} />;
  })}</div>;
}

const details: Record<string, {
  kicker: string;
  headline: string;
  metrics: Array<[string, string]>;
  challenge: string;
  challengePoints: Array<[string, string]>;
  solution: string;
  solutionPoints: Array<[string, string]>;
  capabilities: Array<[string, string[]]>;
  results: Array<[string, string]>;
}> = {
  'modern-law': {
    kicker: 'A content engine built for a multi-brand law firm',
    headline: 'From content bottlenecks to an always-on publishing operation.',
    metrics: [['4', 'Brands connected'], ['1', 'Unified workflow'], ['Always on', 'Content production'], ['Less', 'Manual coordination']],
    challenge: 'Four distinct legal brands needed a consistent stream of useful content, but every article, image, and social post created another handoff for an already busy team.',
    challengePoints: [['Scattered production', 'Ideas, drafts, approvals, and assets moved across disconnected tools.'], ['Brand consistency', 'Every brand needed its own voice without multiplying the workload.'], ['Slow repurposing', 'One useful idea took too much manual effort to become a full campaign.']],
    solution: 'CodeSquad designed a central automation system that turns approved ideas into coordinated blog, social, and visual content for every brand.',
    solutionPoints: [['One content pipeline', 'A structured workflow moves every idea from brief to review and publication.'], ['Multi-brand intelligence', 'Rules preserve each brand’s audience, tone, and legal context.'], ['Automated repurposing', 'Long-form content becomes platform-ready social posts and image prompts automatically.']],
    capabilities: [['Content operations', ['Central publishing queue', 'Approval checkpoints', 'Reusable campaign briefs']], ['AI automation', ['Draft generation', 'Social repurposing', 'Visual asset prompts']], ['Governance', ['Brand-specific guardrails', 'Human review', 'Status visibility']]],
    results: [['A repeatable publishing system', 'The team can run content production as an operation instead of rebuilding the process for every campaign.'], ['More output from every idea', 'Each approved topic can feed multiple brands, formats, and channels.'], ['Control stays with the team', 'Automation handles production while subject-matter experts keep final approval.']],
  },
  ipromo: {
    kicker: 'Automated product marketing for B2B e-commerce',
    headline: 'A product campaign pipeline connected directly to Salesforce.',
    metrics: [['25+', 'Years in business'], ['1', 'Connected pipeline'], ['Automated', 'Product imagery'], ['Faster', 'Campaign launch']],
    challenge: 'Product-of-the-month campaigns required repetitive image work, data enrichment, analysis, and coordination between sales and marketing systems.',
    challengePoints: [['Manual image production', 'Each campaign required repeated creative preparation and formatting.'], ['Disconnected customer data', 'Campaign inputs and Salesforce context lived in separate workflows.'], ['Limited analysis', 'Teams spent time assembling information before they could act on it.']],
    solution: 'We built an automated image and campaign pipeline that enriches product data, prepares creative assets, and connects the result to Salesforce and email workflows.',
    solutionPoints: [['Automated creative production', 'Campaign-ready product imagery is generated through a consistent workflow.'], ['Salesforce integration', 'Customer and product context moves into the campaign without duplicate entry.'], ['Built-in enrichment', 'The system prepares and analyses product information before launch.']],
    capabilities: [['Creative automation', ['Product image pipeline', 'Campaign formatting', 'Asset quality checks']], ['CRM workflow', ['Salesforce connection', 'Record enrichment', 'Campaign handoff']], ['Marketing operations', ['Email-ready outputs', 'Repeatable monthly process', 'Performance analysis']]],
    results: [['A faster path to market', 'Monthly campaigns move from selection to launch with fewer manual steps.'], ['Consistent campaign assets', 'Every product follows the same reliable creative workflow.'], ['Sales and marketing connected', 'Campaign execution uses the customer and product context already in Salesforce.']],
  },
  gengyveusa: {
    kicker: 'One intelligence layer for a healthcare commerce brand',
    headline: 'SEO, paid media, and customer feedback working as one system.',
    metrics: [['3', 'Growth channels unified'], ['1', 'Automation layer'], ['Always on', 'Review analysis'], ['Clearer', 'Marketing decisions']],
    challenge: 'SEO, advertising, content, and customer reviews produced valuable signals, but those signals were isolated across tools and difficult to turn into coordinated action.',
    challengePoints: [['Channel silos', 'Organic and paid teams worked from separate views of performance.'], ['Unstructured feedback', 'Review insights were difficult to analyse consistently at scale.'], ['Slow decisions', 'Reporting took time away from improving campaigns and content.']],
    solution: 'CodeSquad unified the brand’s marketing signals into one automation layer that connects search, ads, content, and customer sentiment.',
    solutionPoints: [['Unified marketing view', 'Cross-channel signals are organised around the decisions the team needs to make.'], ['Automated review intelligence', 'Customer feedback is grouped into recurring themes and opportunities.'], ['Actionable content inputs', 'Search and ad insights inform the next content priorities.']],
    capabilities: [['Search intelligence', ['SEO monitoring', 'Content opportunity discovery', 'Performance signals']], ['Paid media', ['Campaign data connection', 'Cross-channel context', 'Decision support']], ['Customer voice', ['Review analysis', 'Theme detection', 'Messaging insights']]],
    results: [['One source of marketing context', 'The team can see how content, ads, search, and customer feedback influence each other.'], ['Less reporting overhead', 'Automated analysis replaces repetitive data assembly.'], ['Sharper priorities', 'Growth decisions are grounded in connected customer and performance signals.']],
  },
  energybits: {
    kicker: 'Marketing intelligence across a complex DTC stack',
    headline: 'Fifteen-plus platforms turned into one publishing intelligence system.',
    metrics: [['15+', 'Platforms connected'], ['3', 'Search scores'], ['1', 'Intelligence layer'], ['Before publish', 'Content validation']],
    challenge: 'With performance and content data spread across more than fifteen platforms, the team needed a practical way to turn fragmented signals into publish-ready decisions.',
    challengePoints: [['Too many data sources', 'Marketing context was distributed across ad, analytics, and content platforms.'], ['Manual content workflow', 'Research, drafting, and quality checks required repeated effort.'], ['New search landscape', 'Content needed to perform in traditional search and AI-generated answers.']],
    solution: 'We built a connected marketing intelligence platform with automated blog pipelines and SEO, AEO, and GEO scoring before content goes live.',
    solutionPoints: [['Connected intelligence', 'Signals from 15+ platforms feed a shared decision layer.'], ['Automated blog pipeline', 'Research and structured drafting move through a consistent production flow.'], ['Pre-publish scoring', 'Every draft is evaluated for search, answer-engine, and generative-engine readiness.']],
    capabilities: [['Data connection', ['15+ platform integrations', 'Normalised marketing signals', 'Unified analysis']], ['Content automation', ['Research pipeline', 'Structured drafting', 'Editorial workflow']], ['Discoverability', ['SEO scoring', 'AEO scoring', 'GEO scoring']]],
    results: [['Quality checks happen earlier', 'Content is evaluated before publication, when improvements are easiest to make.'], ['A scalable content operation', 'The team can increase output without multiplying manual research and coordination.'], ['Visibility beyond traditional search', 'The workflow accounts for both search engines and AI answer experiences.']],
  },
};

export async function generateStaticParams() {
  return (await getCaseStudies()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const item = await getCaseStudy(params.slug);
  return item ? { title: `${item.name} Case Study`, description: item.desc } : {};
}

export default async function CaseStudyPage({ params }: PageProps) {
  const item = await getCaseStudy(params.slug);
  if (!item?.published) notFound();
  const preset = details[item.slug];
  const customMetrics = pairs(item.metrics);
  const customImplementation = pairs(item.implementation);
  const customResults = pairs(item.results);
  const customCapabilities = pairs(item.capabilities).map(([title, value]) => [title, value.split(',').map((point) => point.trim()).filter(Boolean)] as [string, string[]]);
  const detail = {
    kicker: item.kicker || preset?.kicker || item.desc,
    headline: item.headline || preset?.headline || 'A better system for the work that matters.',
    metrics: customMetrics.length ? customMetrics : (preset?.metrics || []),
    challenge: item.challenge || preset?.challenge || item.desc,
    challengePoints: preset?.challengePoints || [],
    solution: item.solution || preset?.solution || 'CodeSquad designed and delivered a connected system around the team’s workflow.',
    solutionPoints: customImplementation.length ? customImplementation : (preset?.solutionPoints || []),
    capabilities: customCapabilities.length ? customCapabilities : (preset?.capabilities || []),
    results: customResults.length ? customResults : (preset?.results || []),
  };
  const challengePlacement = item.challengeMediaPlacement || 'inline';
  const solutionPlacement = item.solutionMediaPlacement || 'inline';
  const implementationPlacement = item.implementationMediaPlacement || 'inline';
  const resultsPlacement = item.resultsMediaPlacement || 'inline';
  const conclusionPlacement = item.conclusionMediaPlacement || 'inline';
  const challengeInline = challengePlacement === 'inline';
  const solutionInline = solutionPlacement === 'inline';
  const implementationInline = implementationPlacement === 'inline';
  const resultsInline = resultsPlacement === 'inline';
  const conclusionInline = conclusionPlacement === 'inline';
  const implementationMarkers = markerCount(item.implementation);
  const resultsMarkers = markerCount(item.results);

  return (
    <article className="cs-study">
      <CaseStudyHero cover={item.coverImage} alt={`${item.name} case study cover`}>
        <div className="cs-container">
          <Link className="cs-study-back" href="/#case-studies">← All case studies</Link>
          <p className="cs-study-label">{item.category} · Case study</p>
          <h1>{item.name}</h1>
          <p className="cs-study-kicker">{detail.kicker}</p>
          <p className="cs-study-intro">{item.desc}</p>
          <div className="cs-study-meta"><span>Services</span><strong>{item.services}</strong></div>
        </div>
      </CaseStudyHero>

      {!!detail.metrics.length && <section className="cs-study-metrics" aria-label="Project highlights">
        <div className="cs-container cs-study-metrics__grid">
          {detail.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>}

      <section className="cs-study-section">
        {challengePlacement === 'start' && <div className="cs-container cs-study-section-media--start"><MediaGrid links={item.challengeMedia} name={item.name} /></div>}
        <div className={`cs-container cs-study-split${item.challengeMedia?.length ? ' cs-study-split--media' : ''}`}>
          <div className="cs-study-heading"><span>The challenge</span><h2>{detail.headline}</h2></div>
          <div className="cs-study-copy"><NarrativeWithMedia text={detail.challenge} links={challengeInline ? item.challengeMedia : undefined} name={item.name} />{detail.challengePoints.map(([title, body]) => <div className="cs-study-point" key={title}><b>{title}</b><p>{body}</p></div>)}</div>
        </div>
        {challengePlacement === 'end' && <div className="cs-container"><MediaGrid links={item.challengeMedia} name={item.name} /></div>}
      </section>

      <section className="cs-study-section cs-study-section--ink">
        <div className="cs-container">
          {solutionPlacement === 'start' && <div className="cs-study-section-media--start"><MediaGrid links={item.solutionMedia} name={item.name} dark /></div>}
          <div className="cs-study-heading cs-study-heading--wide"><span>The solution</span><h2>A connected system designed around the way the team actually works.</h2><NarrativeWithMedia text={detail.solution} links={solutionInline ? item.solutionMedia : undefined} name={item.name} dark /></div>
          {implementationPlacement === 'start' && <div className="cs-study-section-media--start"><MediaGrid links={item.implementationMedia} name={item.name} dark /></div>}
          {implementationInline && markerMedia(item.implementation, item.implementationMedia, 0) && <div className="cs-study-inline-media"><MediaItem url={markerMedia(item.implementation, item.implementationMedia, 0)!} name={item.name} /></div>}
          {!!detail.solutionPoints.length && <div className="cs-study-cards">{detail.solutionPoints.map(([title, body], index) => { const media = implementationMarkers ? markerMedia(item.implementation, item.implementationMedia, index + 1) : item.implementationMedia?.[index]; return <div className="cs-study-card" key={`${title}-${index}`}><em>{String(index + 1).padStart(2, '0')}</em><h3>{title}</h3>{body && <p>{body}</p>}{implementationInline && media && <div className="cs-study-inline-media"><MediaItem url={media} name={item.name} /></div>}</div>; })}</div>}
          {solutionPlacement === 'end' && <MediaGrid links={item.solutionMedia} name={item.name} dark />}
          {implementationInline ? <MediaGrid links={item.implementationMedia?.slice(implementationMarkers || detail.solutionPoints.length)} name={item.name} dark /> : implementationPlacement === 'end' ? <MediaGrid links={item.implementationMedia} name={item.name} dark /> : null}
        </div>
      </section>

      {!!detail.capabilities.length && <section className="cs-study-section">
        <div className="cs-container">
          <div className="cs-study-heading cs-study-heading--wide"><span>Key capabilities</span><h2>What the system does.</h2></div>
          <div className="cs-study-capabilities">{detail.capabilities.map(([title, points]) => <div key={title}><h3>{title}</h3><ul>{points.map(point => <li key={point}>{point}</li>)}</ul></div>)}</div>
        </div>
      </section>}

      {(detail.results.length > 0 || !!item.resultsMedia?.length) && <section className="cs-study-section cs-study-section--soft">
        {resultsPlacement === 'start' && <div className="cs-container cs-study-section-media--start"><MediaGrid links={item.resultsMedia} name={item.name} /></div>}
        <div className={`cs-container cs-study-split${item.resultsMedia?.length ? ' cs-study-split--media' : ''}`}>
          <div className="cs-study-heading"><span>Results & impact</span><h2>From fragmented work to a repeatable operation.</h2></div>
          <div className="cs-study-results">{resultsInline && markerMedia(item.results, item.resultsMedia, 0) && <div className="cs-study-inline-media"><MediaItem url={markerMedia(item.results, item.resultsMedia, 0)!} name={item.name} /></div>}{detail.results.map(([title, body], index) => { const media = resultsMarkers ? markerMedia(item.results, item.resultsMedia, index + 1) : item.resultsMedia?.[index]; return <div className="cs-study-results__group" key={`${title}-${index}`}><div className="cs-study-results__item"><Icon name="check" /><div><h3>{title}</h3><p>{body}</p></div></div>{resultsInline && media && <div className="cs-study-inline-media"><MediaItem url={media} name={item.name} /></div>}</div>; })}{resultsInline && item.resultsMedia?.slice(resultsMarkers || detail.results.length).map((url) => <div className="cs-study-inline-media" key={url}><MediaItem url={url} name={item.name} /></div>)}</div>
        </div>
        {resultsPlacement === 'end' && <div className="cs-container"><MediaGrid links={item.resultsMedia} name={item.name} /></div>}
      </section>}

      {!!item.mediaLinks?.length && <section className="cs-study-section cs-study-media"><div className="cs-container"><div className="cs-study-heading cs-study-heading--wide"><span>Project media</span><h2>See the system in action.</h2></div><MediaGrid links={item.mediaLinks} name={item.name} /></div></section>}

      {(item.testimonial || item.conclusion || item.conclusionMedia?.length) && <section className="cs-study-section cs-study-quote"><div className="cs-container">{conclusionPlacement === 'start' && <div className="cs-study-section-media--start"><MediaGrid links={item.conclusionMedia} name={item.name} dark /></div>}{item.testimonial && <blockquote>“{item.testimonial}”{item.testimonialAuthor && <cite>— {item.testimonialAuthor}</cite>}</blockquote>}{item.conclusion && <div className="cs-study-conclusion"><span>Conclusion</span><NarrativeWithMedia text={item.conclusion} links={conclusionInline ? item.conclusionMedia : undefined} name={item.name} dark /></div>}{(conclusionPlacement === 'end' || (!item.conclusion && conclusionPlacement === 'inline')) && <MediaGrid links={item.conclusionMedia} name={item.name} dark />}</div></section>}

      <section className="cs-study-cta"><div className="cs-container"><p>Have an idea worth building?</p><h2>Let’s turn your workflow into a system that scales.</h2><a className="cs-btn cs-btn--primary" href={site.calendly} target="_blank" rel="noopener noreferrer">Book a free call <Icon name="arrow-ur" /></a></div></section>
    </article>
  );
}
