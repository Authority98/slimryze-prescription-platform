import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { User, Mail, Phone, MapPin, Calendar, Users, FileText } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface Props {
  patient: {
    patient_name: string;
    patient_email: string;
    patient_phone: string;
    patient_address: string;
    patient_dob: string;
    patient_gender: string;
  };
  onClose: () => void;
}

interface Prescription {
  id: string;
  created_at: string;
  dosage: string;
  quantity: number;
  refills: number;
}

export function PatientDetailsDialog({ patient, onClose }: Props) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptionHistory();
  }, [patient]);

  const fetchPrescriptionHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('No authenticated user found');
        return;
      }

      const { data, error } = await supabase
        .from('prescriptions')
        .select('id, created_at, dosage, quantity, refills')
        .eq('patient_email', patient.patient_email)
        .eq('practitioner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrescriptions(data || []);
    } catch (error) {
      console.error('Error fetching prescription history:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load prescription history. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
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
                <p className="text-gray-900 font-medium">{patient.patient_name}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                </div>
                <p className="text-gray-900 font-medium">
                  {new Date(patient.patient_dob).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-500" />
                  <label className="text-sm font-medium text-gray-500">Email</label>
                </div>
                <p className="text-gray-900">{patient.patient_email}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-500" />
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                </div>
                <p className="text-gray-900">{patient.patient_phone}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  <label className="text-sm font-medium text-gray-500">Address</label>
                </div>
                <p className="text-gray-900">{patient.patient_address}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <label className="text-sm font-medium text-gray-500">Gender</label>
                </div>
                <p className="text-gray-900">{patient.patient_gender}</p>
              </div>
            </div>
          </div>

          {/* Prescription History */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-purple-100">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Prescription History
              </h3>
            </div>
            <Separator className="bg-gradient-to-r from-purple-200 to-blue-200" />
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="p-4 bg-white/50 rounded-lg shadow-sm space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {prescription.dosage}
                      </p>
                      <p className="text-xs text-gray-500">
                        Quantity: {prescription.quantity} | Refills: {prescription.refills}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {new Date(prescription.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {prescriptions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No prescription history found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}