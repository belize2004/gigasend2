import DashboardMenu from '@/components/dashboard/DashboardMenu';
import ProtectedPage from '@/components/ProtectedPage';
import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children
}) => {
  return (
    <ProtectedPage>
      <div className="min-h-screen bg-ocean-950 text-slate-100 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 font-body">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Sidebar Menu */}
            <div className="lg:col-span-1">
              <DashboardMenu />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default DashboardLayout;