import React from 'react';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from "../ui/button";
import { FormData } from '../../types/form';
import { useAuth } from '../auth/AuthContext';
import { FormPill } from '../ui/form-pill';
import { LoginDialog } from '../auth/LoginDialog';
import { SignUpDialog } from '../auth/SignUpDialog';
import { useNavigate } from 'react-router-dom';

interface Props {
  formData: FormData;
  onSignOut: () => void;
}

export function FormHeader({ formData, onSignOut }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="w-full px-8 py-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-full">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold">
              {formData.doctorName || 'Welcome to SlimRyze'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {formData.clinicName || 'Sign in to write prescriptions'}
            </p>
          </div>
        </div>

        <div className="flex-1 flex justify-center mx-4">
          <FormPill />
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleDashboard}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSignOut}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <LoginDialog />
              <SignUpDialog />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}