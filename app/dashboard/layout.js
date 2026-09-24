import DashNav from '../../components/DashNav';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dashboard | CodeSquad',
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }) {
  return (
    <div className="dash">
      <DashNav />
      <main className="dash-main">{children}</main>
    </div>
  );
}
