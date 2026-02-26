import type { OrganizationType } from '@/content/types';
import OrganizationTypeCard from './OrganizationTypeCard';

export default function OrganizationTypeGrid({ items }: { items: OrganizationType[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((x) => (
        <OrganizationTypeCard key={x.id} item={x} />
      ))}
    </div>
  );
}
