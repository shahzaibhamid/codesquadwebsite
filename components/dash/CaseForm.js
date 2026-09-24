import { saveCaseAction } from '../../app/dashboard/actions';

const FILTERS = ['Healthcare & Clinics', 'E-commerce', 'Legal Services', 'Automotive', 'Education', 'Financial Services'];

export default function CaseForm({ item = {}, body = '', original = '' }) {
  return (
    <form className="dash-form" action={saveCaseAction}>
      {original ? <input type="hidden" name="original" value={original} /> : null}
      <label>Client / project name</label>
      <input name="name" defaultValue={item.name || ''} placeholder="Harmony Med Spa" required />

      <label>Slug (optional — generated from the name)</label>
      <input name="slug" defaultValue={item.slug || ''} placeholder="harmony-med-spa" />

      <div className="dash-form__row">
        <div>
          <label>Category label</label>
          <input name="cat" defaultValue={item.cat || ''} placeholder="Medical Aesthetics" />
        </div>
        <div>
          <label>Filter group</label>
          <select name="filter" defaultValue={item.filter || 'Healthcare & Clinics'}>
            {FILTERS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>

      <label>Tagline (shown on the list card)</label>
      <textarea name="tagline" defaultValue={item.tagline || ''} rows={2} placeholder="How we built a 24/7 patient growth system" />

      <label>Cover image URL</label>
      <input name="img" defaultValue={item.img || ''} placeholder="/uploads/case-studies/… or https://…" />

      <label>Case study body (HTML)</label>
      <div className="dash-help">This is the full case-study page body. The rich field-by-field builder is coming next — for now you can edit the HTML directly.</div>
      <textarea name="body" defaultValue={body} rows={16} placeholder="<article class=&quot;cs-study&quot;>…</article>" className="dash-mono" />

      <button type="submit" className="dash-btn dash-btn--primary">{original ? 'Save changes' : 'Create case study'}</button>
    </form>
  );
}
