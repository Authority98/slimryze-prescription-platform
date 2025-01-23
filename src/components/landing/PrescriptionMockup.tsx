import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, FileText, Pill, Hash, RotateCcw } from 'lucide-react';

export function PrescriptionMockup() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">New Prescription</h3>
          <p className="text-sm text-gray-500">Create a new digital prescription</p>
        </div>
        <div className="p-2 bg-purple-50 rounded-full">
          <FileText className="w-5 h-5 text-purple-600" />
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Patient Information */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Patient Information</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <div className="w-full h-10 pl-10 bg-gray-50 rounded-md border border-gray-200" />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <div className="w-full h-10 pl-10 bg-gray-50 rounded-md border border-gray-200" />
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <div className="w-full h-10 pl-10 bg-gray-50 rounded-md border border-gray-200" />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <div className="w-full h-10 pl-10 bg-gray-50 rounded-md border border-gray-200" />
          </div>
        </div>

        {/* Prescription Details */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Prescription Details</label>
          <div className="grid grid-cols-3 gap-3">
            <div className="relative">
              <Pill className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <div className="w-full h-10 pl-10 bg-gray-50 rounded-md border border-gray-200" />
            </div>
            <div className="relative">
              <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <div className="w-full h-10 pl-10 bg-gray-50 rounded-md border border-gray-200" />
            </div>
            <div className="relative">
              <RotateCcw className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <div className="w-full h-10 pl-10 bg-gray-50 rounded-md border border-gray-200" />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Instructions</label>
          <div className="w-full h-24 bg-gray-50 rounded-md border border-gray-200" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <div className="w-24 h-10 bg-gray-100 rounded-md" />
        <div className="w-32 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md" />
      </div>
    </div>
  );
} 