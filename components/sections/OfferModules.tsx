import Icon from '@/components/ui/Icon';
import type { IconName } from '@/types';
import type { OfferModule } from '@/data/pricing';

const MODULE_ICON: Record<OfferModule['key'], IconName> = {
  attract: 'search',
  respond: 'reply',
  recover: 'target',
};

export default function OfferModules({ modules }: { modules: OfferModule[] }) {
  if (!modules.length) return null;
  return (
    <div className="cs-modules" aria-label="The three modules every plan is built from">
      {modules.map((mod) => (
        <div className="cs-module-card" key={mod.key}>
          <span className="cs-module-card__icon"><Icon name={MODULE_ICON[mod.key]} /></span>
          <h3>{mod.name}</h3>
          <p className="cs-module-card__tagline">{mod.tagline}</p>
          <ul className="cs-bullets">
            {mod.points.map((point) => (
              <li key={point}><Icon name="check" />{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
