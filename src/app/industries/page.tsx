import Navigation from '@/components/navigation';
import Industries from '@/components/industries';

export const metadata = {
  title: 'Industries | CodeSquad',
  description: 'Explore the industries where CodeSquad builds automation, AI, and operational systems.',
};

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <Industries />
      </main>
    </div>
  );
}
