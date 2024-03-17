import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Miquant Website Administration',
  description: 'Miquant Website Administration',
};

import MainLayout from '@/layout';
import DashboardContent from './(admin)/(dashboard)/components/DashboardContent';

export default function Dashboard() {
  return (
    <MainLayout>
      <DashboardContent />
    </MainLayout>
  );
}
