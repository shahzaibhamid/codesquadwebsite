import Icon from './Icon';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  withPoints?: boolean;
}

/** Service card — ported from cs_render_service_card(). */
export default function ServiceCard({ service, withPoints = true }: ServiceCardProps) {
  return (
    <article className="cs-card">
      <div className="cs-icon">
        <Icon name={service.icon} />
      </div>
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
      {withPoints && service.points.length > 0 && (
        <ul className="cs-bullets">
          {service.points.map((pt) => (
            <li key={pt}>
              <Icon name="check" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
