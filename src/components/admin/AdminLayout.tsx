import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { UserMenu } from './UserMenu';

interface Props {
  children: React.ReactNode;
}

export function AdminLayout({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState<{ full_name: string; clinic_name: string } | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('practitioners')
        .select('full_name, clinic_name')
        .eq('id', user.id)
        .single();

      if (data) {
        setUserData(data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  SlimRyze Admin
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/admin/dashboard"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/admin/dashboard')
                      ? 'border-purple-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/admin/prescriptions"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/admin/prescriptions')
                      ? 'border-purple-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Prescription History
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] flex items-center gap-2 px-4 py-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Create New Prescription
                </Button>
              </Link>
              {userData && (
                <UserMenu
                  userName={userData.full_name}
                  clinicName={userData.clinic_name}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="py-10">
        {children}
      </main>
    </div>
  );
}