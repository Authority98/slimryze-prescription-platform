import React from 'react';
import { User, LogOut, Printer } from 'lucide-react';
import { Button } from "../ui/button";
import { FormData } from '../../types/form';
import { FormPill } from '../ui/form-pill';

interface Props {
  formData: FormData;
  onSignOut: () => void;
  onPrint: () => void;
}

export function FormHeader({ formData, onSignOut, onPrint }: Props) {
  return (
    <div className="flex justify-between items-center bg-white/80 backdrop-blur-xl rounded-lg shadow-sm border border-white/20 p-4">
      <div className="flex items-center gap-2">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-full">
          <User className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="font-semibold">{formData.doctorName}</h2>
          <p className="text-sm text-muted-foreground">{formData.clinicName}</p>
        </div>
      </div>

      <div className="flex-1 flex justify-center mx-4">
        <FormPill />
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={onPrint}
        >
          <Printer className="h-4 w-4" />
          Print
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
      </div>
    </div>
  );
}