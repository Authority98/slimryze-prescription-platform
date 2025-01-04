import React from 'react';

interface Props {
  onReset: () => void;
}

export function FormActions({ onReset }: Props) {
  return (
    <div className="flex justify-end space-x-4">
      <button
        type="button"
        onClick={onReset}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Clear Form
      </button>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit Prescription
      </button>
    </div>
  );
}