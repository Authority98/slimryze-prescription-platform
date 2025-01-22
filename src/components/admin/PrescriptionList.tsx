import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { LoadingPage } from '../ui/loading';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Plus, FileText, Calendar, User, Pill, Eye, Mail, MapPin, Users, Beaker, Hash, RotateCcw, Activity, PenTool, Clock, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Phone } from 'lucide-react';

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

export function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('prescriptions')
        .select('*')
        .eq('practitioner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setPrescriptions(data);
      }
    } catch (error) {
      console.error('Error loading prescriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPrescription = () => {
    navigate('/');
  };

  const handlePrescriptionClick = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Prescription History
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage and view all your prescriptions
          </p>
        </div>
        <Button 
          onClick={handleNewPrescription}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Prescription
        </Button>
      </div>

      <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prescription Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prescriptions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-base">No prescriptions found</p>
                    <p className="text-sm text-gray-400 mt-1">Create your first prescription to get started</p>
                  </td>
                </tr>
              ) : (
                prescriptions.map((prescription) => (
                  <tr 
                    key={prescription.id} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handlePrescriptionClick(prescription)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <User className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {prescription.patient_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            DOB: {new Date(prescription.patient_dob).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <Pill className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {prescription.dosage}
                          </div>
                          <div className="text-sm text-gray-500">
                            Qty: {prescription.quantity} | Refills: {prescription.refills}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <div className="text-sm text-gray-900">
                            {new Date(prescription.created_at).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(prescription.created_at).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:text-purple-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrescriptionClick(prescription);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <style>
        {`
          @media print {
            /* Hide everything except the dialog content */
            body > *:not(.print-content) {
              display: none !important;
            }
            
            /* Reset dialog styles for print */
            .print-content {
              position: static !important;
              transform: none !important;
              max-height: none !important;
              overflow: visible !important;
              background: white !important;
              padding: 20px !important;
              width: 100% !important;
              max-width: none !important;
            }

            /* Maintain grid layout in print */
            .grid {
              display: grid !important;
            }
            
            .grid-cols-1.md\\:grid-cols-2 {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            /* Ensure gradients are visible in print */
            .bg-gradient-to-r {
              background: #7c3aed !important;
              -webkit-text-fill-color: #7c3aed !important;
            }

            /* Ensure text is visible */
            .text-transparent {
              -webkit-text-fill-color: #7c3aed !important;
            }

            /* Adjust spacing for print */
            .space-y-8 {
              margin-top: 2rem !important;
            }

            /* Hide the print button when printing */
            .print-button {
              display: none !important;
            }

            /* Ensure icons are visible */
            .text-purple-500, .text-purple-600 {
              color: #7c3aed !important;
            }

            /* Ensure backgrounds are visible */
            .bg-purple-100 {
              background-color: #f3e8ff !important;
            }

            /* Ensure separators are visible */
            .bg-gradient-to-r.from-purple-200.to-blue-200 {
              border-top: 1px solid #7c3aed !important;
              margin: 1rem 0 !important;
            }

            /* Maintain gaps in print */
            .gap-6 {
              gap: 1.5rem !important;
            }

            /* Maintain padding in print */
            .p-4 {
              padding: 1rem !important;
            }

            /* Ensure rounded corners in print */
            .rounded-lg {
              border-radius: 0.5rem !important;
            }

            /* Add subtle borders for better print visibility */
            .bg-white\\/50 {
              background: white !important;
              border: 1px solid #e5e7eb !important;
            }
          }
        `}
      </style>

      {/* Prescription Details Dialog */}
      <Dialog open={!!selectedPrescription} onOpenChange={() => setSelectedPrescription(null)}>
        <DialogContent className="print-content max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Prescription Details
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Prescription ID: <span className="font-mono text-purple-600">{selectedPrescription?.id}</span>
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
          {selectedPrescription && (
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
                    <p className="text-gray-900 font-medium">{selectedPrescription.patient_name}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                    </div>
                    <p className="text-gray-900 font-medium">
                      {new Date(selectedPrescription.patient_dob).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-500" />
                      <label className="text-sm font-medium text-gray-500">Email</label>
                    </div>
                    <p className="text-gray-900">{selectedPrescription.patient_email}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-500" />
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                    </div>
                    <p className="text-gray-900">{selectedPrescription.patient_phone}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      <label className="text-sm font-medium text-gray-500">Address</label>
                    </div>
                    <p className="text-gray-900">{selectedPrescription.patient_address}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <label className="text-sm font-medium text-gray-500">Gender</label>
                    </div>
                    <p className="text-gray-900">{selectedPrescription.patient_gender}</p>
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
                    <p className="text-gray-900 font-medium">{selectedPrescription.dosage}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-purple-500" />
                      <label className="text-sm font-medium text-gray-500">Quantity</label>
                    </div>
                    <p className="text-gray-900 font-medium">{selectedPrescription.quantity} units</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-purple-500" />
                      <label className="text-sm font-medium text-gray-500">Refills</label>
                    </div>
                    <p className="text-gray-900 font-medium">{selectedPrescription.refills}</p>
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
                    <p className="text-gray-900 font-medium italic">{selectedPrescription.signature}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <label className="text-sm font-medium text-gray-500">Date & Time Prescribed</label>
                    </div>
                    <p className="text-gray-900 font-medium">
                      {new Date(selectedPrescription.created_at).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} at {new Date(selectedPrescription.created_at).toLocaleTimeString('en-US', {
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
    </div>
  );
}