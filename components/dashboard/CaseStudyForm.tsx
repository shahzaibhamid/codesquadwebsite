import type { CaseStudy } from '@/types';

interface CaseStudyFormProps {
  action: (formData: FormData) => void | Promise<void>;
  caseStudy?: CaseStudy;
  submitLabel: string;
}

export default function CaseStudyForm({ action, caseStudy, submitLabel }: CaseStudyFormProps) {
  return (
    <form className="cs-form" action={action} encType="multipart/form-data">
      {caseStudy && <input type="hidden" name="original_slug" value={caseStudy.slug} />}

      <div className="cs-field"><label htmlFor="case-name">Client or project name</label><input id="case-name" name="name" className="cs-input" defaultValue={caseStudy?.name} required /></div>
      <div className="cs-field"><label htmlFor="case-slug">Slug (optional — generated from the name)</label><input id="case-slug" name="slug" className="cs-input" defaultValue={caseStudy?.slug} placeholder="client-name" /></div>
      <div className="cs-field"><label htmlFor="case-url">Client website URL</label><input id="case-url" name="url" className="cs-input" type="url" defaultValue={caseStudy?.url} placeholder="https://example.com" required /></div>
      <div className="cs-field"><label htmlFor="case-category">Industry / category</label><input id="case-category" name="category" className="cs-input" defaultValue={caseStudy?.category} placeholder="Healthcare" required /></div>
      <div className="cs-field"><label htmlFor="case-services">Services provided</label><input id="case-services" name="services" className="cs-input" defaultValue={caseStudy?.services} placeholder="Automation · CRM · Website" required /></div>
      <div className="cs-field"><label htmlFor="case-desc">Case-study summary</label><textarea id="case-desc" name="desc" className="cs-textarea" defaultValue={caseStudy?.desc} required /><small>No word or character limit.</small></div>

      <fieldset className="cs-case-form__section">
        <legend>Story and page content</legend>
        <p>All long-form fields are optional and have no word limit.</p>
        <div className="cs-field"><label htmlFor="case-kicker">Hero kicker</label><textarea id="case-kicker" name="kicker" className="cs-textarea" defaultValue={caseStudy?.kicker} /></div>
        <div className="cs-field"><label htmlFor="case-headline">Main story headline</label><textarea id="case-headline" name="headline" className="cs-textarea" defaultValue={caseStudy?.headline} /></div>
        <SectionMediaFields section="challenge" label="Challenge" values={caseStudy?.challengeMedia} placement={caseStudy?.challengeMediaPlacement} />
        <div className="cs-field"><label htmlFor="case-challenge">The challenge</label><textarea id="case-challenge" name="challenge" className="cs-textarea cs-textarea--long" defaultValue={caseStudy?.challenge} /></div>
        <SectionMediaFields section="solution" label="Solution" values={caseStudy?.solutionMedia} placement={caseStudy?.solutionMediaPlacement} />
        <div className="cs-field"><label htmlFor="case-solution">The solution</label><textarea id="case-solution" name="solution" className="cs-textarea cs-textarea--long" defaultValue={caseStudy?.solution} /></div>
        <SectionMediaFields section="implementation" label="Implementation" values={caseStudy?.implementationMedia} placement={caseStudy?.implementationMediaPlacement} />
        <div className="cs-field"><label htmlFor="case-implementation">Implementation / systems built</label><textarea id="case-implementation" name="implementation" className="cs-textarea cs-textarea--long" defaultValue={caseStudy?.implementation} placeholder={'One item per line: Title | Description'} /><small>One item per line: Title | Description</small></div>
        <SectionMediaFields section="results" label="Results" values={caseStudy?.resultsMedia} placement={caseStudy?.resultsMediaPlacement} />
        <div className="cs-field"><label htmlFor="case-results">Results and impact</label><textarea id="case-results" name="results" className="cs-textarea cs-textarea--long" defaultValue={caseStudy?.results} placeholder={'One result per line: Result | Supporting detail'} /><small>One result per line: Result | Supporting detail</small></div>
        <SectionMediaFields section="conclusion" label="Conclusion" values={caseStudy?.conclusionMedia} placement={caseStudy?.conclusionMediaPlacement} />
        <div className="cs-field"><label htmlFor="case-conclusion">Conclusion</label><textarea id="case-conclusion" name="conclusion" className="cs-textarea cs-textarea--long" defaultValue={caseStudy?.conclusion} /></div>
      </fieldset>

      <fieldset className="cs-case-form__section">
        <legend>Proof, capabilities and media</legend>
        <div className="cs-field"><label htmlFor="case-cover-url">Cover image URL</label><input id="case-cover-url" name="cover_image_url" className="cs-input" type="url" defaultValue={caseStudy?.coverImage?.startsWith('http') ? caseStudy.coverImage : ''} placeholder="https://example.com/cover.jpg" />{caseStudy?.coverImage && <small>Current cover: {caseStudy.coverImage}</small>}</div>
        <div className="cs-field"><label htmlFor="case-cover-file">Upload cover image</label><input id="case-cover-file" name="cover_image_file" className="cs-input" type="file" accept="image/*" /><input type="hidden" name="existing_cover_image" value={caseStudy?.coverImage || ''} /><small>Uploading a new image or entering a new URL replaces the current cover.</small></div>
        <div className="cs-field"><label htmlFor="case-metrics">Metrics</label><textarea id="case-metrics" name="metrics" className="cs-textarea" defaultValue={caseStudy?.metrics} placeholder={'≈ 60 sec | First response\n24 / 7 | Lead capture'} /><small>One metric per line: Value | Label</small></div>
        <div className="cs-field"><label htmlFor="case-capabilities">Capabilities</label><textarea id="case-capabilities" name="capabilities" className="cs-textarea cs-textarea--long" defaultValue={caseStudy?.capabilities} placeholder={'Lead operations | Website capture, staff notifications, instant response'} /><small>One group per line: Heading | Comma-separated capabilities</small></div>
        <div className="cs-field"><label htmlFor="case-media">Media links</label><textarea id="case-media" name="media_links" className="cs-textarea cs-textarea--long" defaultValue={caseStudy?.mediaLinks?.join('\n')} placeholder={'https://example.com/image.jpg\nhttps://example.com/demo.mp4\nhttps://youtube.com/watch?v=…'} /><small>One URL per line. Supports images, MP4/WebM videos, YouTube, and external media.</small></div>
        <div className="cs-field"><label htmlFor="case-quote">Testimonial / quote</label><textarea id="case-quote" name="testimonial" className="cs-textarea" defaultValue={caseStudy?.testimonial} /></div>
        <div className="cs-field"><label htmlFor="case-quote-author">Quote author</label><input id="case-quote-author" name="testimonial_author" className="cs-input" defaultValue={caseStudy?.testimonialAuthor} /></div>
      </fieldset>

      <div className="cs-field"><label htmlFor="case-order">Display order</label><input id="case-order" name="sort_order" className="cs-input" type="number" min="0" step="1" defaultValue={caseStudy?.sortOrder ?? 1} required /></div>
      <label className="cs-field" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 10 }}><input name="published" type="checkbox" defaultChecked={caseStudy?.published ?? true} />Published on the homepage</label>
      <button className="cs-btn cs-btn--primary" type="submit">{submitLabel}</button>
    </form>
  );
}

function SectionMediaFields({ section, label, values, placement = 'inline' }: { section: string; label: string; values?: string[]; placement?: 'start' | 'inline' | 'end' }) {
  return (
    <div className="cs-section-media-fields">
      <div className="cs-field"><label htmlFor={`${section}-media-links`}>{label} media URLs</label><textarea id={`${section}-media-links`} name={`${section}_media_links`} className="cs-textarea" defaultValue={values?.join('\n')} placeholder={'One image, video, YouTube, or external URL per line'} /></div>
      <div className="cs-field"><label htmlFor={`${section}-media-files`}>Upload {label.toLowerCase()} media</label><input id={`${section}-media-files`} name={`${section}_media_files`} className="cs-input" type="file" accept="image/*,video/mp4,video/webm,video/ogg" multiple /><small>You may select multiple images or videos. Existing URLs remain listed above and can be removed there.</small></div>
      <div className="cs-field cs-section-media-fields__placement"><label htmlFor={`${section}-media-placement`}>Media position</label><select id={`${section}-media-placement`} name={`${section}_media_placement`} className="cs-input" defaultValue={placement}><option value="start">At the start of this section</option><option value="inline">Between text using #IMAGE#</option><option value="end">At the end of this section</option></select><small>For between-text placement, write <code>#IMAGE#</code> on its own line in the section text exactly where each media item should appear.</small></div>
    </div>
  );
}
