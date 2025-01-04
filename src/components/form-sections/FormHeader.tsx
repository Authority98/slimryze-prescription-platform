import React from 'react';
import { User, LogOut, Printer, LogIn } from 'lucide-react';
import { Button } from "../ui/button";
import { FormData } from '../../types/form';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FormPill } from '../ui/form-pill';

interface Props {
  formData: FormData;
  onSignOut: () => void;
  onPrint: () => void;
}

export function FormHeader({ formData, onSignOut, onPrint }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/admin/login');
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
          {user && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={onPrint}
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={user ? onSignOut : handleSignIn}
            className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
          >
            {user ? <LogOut className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
            {user ? 'Sign Out' : 'Sign In'}
          </Button>
        </div>
      </div>
    </div>
  );
}