import React from 'react';
import { Stethoscope } from 'lucide-react';

export function FormPill() {
  return (
    <div className="flex items-center justify-center h-8 w-auto px-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium shadow-lg">
      <Stethoscope className="w-4 h-4 mr-2" />
      SlimRyze Prescription Platform
    </div>
  );
} 