import React from 'react';
import { FileSignature } from 'lucide-react';
import { FormData } from '../../types/form';

interface Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SignatureSection({ formData, onChange }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <FileSignature className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Electronic Signature</h2>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Practitioner Signature
        </label>
        <input
          type="text"
          name="signature"
          value={formData.signature}
          onChange={onChange}
          placeholder="Type your full name to sign"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
        <p className="mt-2 text-sm text-gray-500">
          By typing your name above, you are signing this prescription electronically.
        </p>
      </div>
    </div>
  );
}