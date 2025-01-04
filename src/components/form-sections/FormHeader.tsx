import React from 'react';
import { Lock } from 'lucide-react';

export function FormHeader() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">SlimRyze Prescription Form</h1>
      <div className="flex items-center justify-center gap-2 mt-2 text-gray-600">
        <Lock className="w-4 h-4" />
        <span className="text-sm">HIPAA-Compliant Secure Form</span>
      </div>
    </div>
  );
}