import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { User, Calendar, Mail, Phone, MapPin, Users, Pill, Hash, RotateCcw, PenTool, Clock, Printer } from 'lucide-react';

interface Prescription {
  id: string;
  practitioner_id: string;
  patient_name: string;
  patient_dob: string;
  dosage: string;
  quantity: number;
  refills: number;
  instructions: string;
  signature: string;
  created_at: string;
  patient_email: string;
  patient_phone: string;
  patient_address: string;
  patient_gender: string;
}

interface Props {
  prescription: Prescription | null;
  onClose: () => void;
}

export function PrescriptionDetailsDialog({ prescription, onClose }: Props) {
  return (
    <Dialog open={!!prescription} onOpenChange={onClose}>
      <DialogContent className="print-content max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Prescription Details
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Prescription ID: <span className="font-mono text-purple-600">{prescription?.id}</span>
            </DialogDescription>
          </div>
          <Button
            onClick={() => window.print()}
            className="print-button bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </DialogHeader>
        {prescription && (
          <div className="space-y-8 py-4">
            {/* Patient Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-purple-100">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Patient Information
                </h3>
              </div>
              <Separator className="bg-gradient-to-r from-purple-200 to-blue-200" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white/50 rounded-lg shadow-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500" />
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                  </div>
                  <p className="text-gray-900 font-medium">{prescription.patient_name}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                  </div>
                  <p className="text-gray-900 font-medium">
                    {new Date(prescription.patient_dob).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-500" />
                    <label className="text-sm font-medium text-gray-500">Email</label>
                  </div>
                  <p className="text-gray-900">{prescription.patient_email}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-purple-500" />
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                  </div>
                  <p className="text-gray-900">{prescription.patient_phone}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    <label className="text-sm font-medium text-gray-500">Address</label>
                  </div>
                  <p className="text-gray-900">{prescription.patient_address}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                  </div>
                  <p className="text-gray-900">{prescription.patient_gender}</p>
                </div>
              </div>
            </div>

            {/* Prescription Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-purple-100">
                  <Pill className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Prescription Details
                </h3>
              </div>
              <Separator className="bg-gradient-to-r from-purple-200 to-blue-200" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white/50 rounded-lg shadow-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-purple-500" />
                    <label className="text-sm font-medium text-gray-500">Dosage</label>
                  </div>
                  <p className="text-gray-900 font-medium">{prescription.dosage}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-purple-500" />
                    <label className="text-sm font-medium text-gray-500">Quantity</label>
                  </div>
                  <p className="text-gray-900 font-medium">{prescription.quantity} units</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-purple-500" />
                    <label className="text-sm font-medium text-gray-500">Refills</label>
                  </div>
                  <p className="text-gray-900 font-medium">{prescription.refills}</p>
                </div>
              </div>
            </div>

            {/* Authorization */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-purple-100">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Authorization
                </h3>
              </div>
              <Separator className="bg-gradient-to-r from-purple-200 to-blue-200" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white/50 rounded-lg shadow-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-purple-500" />
                    <label className="text-sm font-medium text-gray-500">Electronic Signature</label>
                  </div>
                  <p className="text-gray-900 font-medium italic">{prescription.signature}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <label className="text-sm font-medium text-gray-500">Date & Time Prescribed</label>
                  </div>
                  <p className="text-gray-900 font-medium">
                    {new Date(prescription.created_at).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} at {new Date(prescription.created_at).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 