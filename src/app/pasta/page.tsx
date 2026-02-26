import Breadcrumbs from '@/components/Breadcrumbs';
import { getCakeGroups } from '@/content';
import CakeGroupNav from '@/components/cake/CakeGroupNav';

export default function PastaPage() {
  const groups = getCakeGroups();

  return (
    <div>
      <Breadcrumbs items={[{ label: 'BUONO', href: '/' }, { label: 'Pasta' }]} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <CakeGroupNav groups={groups} />
      </div>
    </div>
  );
}
