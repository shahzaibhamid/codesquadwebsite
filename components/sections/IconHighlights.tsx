import Icon from '@/components/ui/Icon';
import type { IconName } from '@/types';

export interface IconHighlightItem {
  icon: IconName;
  title: string;
  description: string;
}

export default function IconHighlights({ items }: { items: IconHighlightItem[] }) {
  if (!items.length) return null;
  return (
    <div className="cs-study-icons">
      {items.map((item) => (
        <div className="cs-study-icons__item" key={item.title}>
          <span className="cs-study-icons__icon"><Icon name={item.icon} /></span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
