import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, User, Mail, Phone, Eye, Trash2 } from 'lucide-react';
import { LoadingPage } from "../ui/loading";
import { useToast } from "../ui/use-toast";
import { PatientDetailsDialog } from './PatientDetailsDialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

interface Patient {
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  patient_address: string;
  patient_dob: string;
  patient_gender: string;
  prescription_count: number;
  latest_prescription: string;
}

export function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('No authenticated user found');
        return;
      }

      const { data, error } = await supabase
        .from('prescriptions')
        .select('patient_name, patient_email, patient_phone, patient_address, patient_dob, patient_gender, created_at')
        .eq('practitioner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group by patient and count prescriptions with proper date handling
      const patientMap = new Map<string, Patient>();
      data?.forEach(prescription => {
        const key = prescription.patient_email || prescription.patient_name;
        if (!patientMap.has(key)) {
          patientMap.set(key, {
            ...prescription,
            prescription_count: 1,
            latest_prescription: prescription.created_at
          });
        } else {
          const existing = patientMap.get(key)!;
          existing.prescription_count++;
          // Update latest prescription if newer
          if (new Date(prescription.created_at) > new Date(existing.latest_prescription)) {
            existing.latest_prescription = prescription.created_at;
          }
        }
      });

      setPatients(Array.from(patientMap.values()));
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load patient data. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patient_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patient_phone?.includes(searchTerm)
  );

  const handleDeleteClick = (e: React.MouseEvent, patient: Patient) => {
    e.stopPropagation();
    setPatientToDelete(patient);
  };

  const handleDeleteConfirm = async () => {
    if (!patientToDelete) return;

    try {
      setLoading(true);
      console.log('Starting delete operation for patient:', patientToDelete.patient_email);

      // Delete all prescriptions for this patient
      const { error: deleteError } = await supabase
        .from('prescriptions')
        .delete()
        .eq('patient_email', patientToDelete.patient_email);

      if (deleteError) {
        console.error('Error during delete:', deleteError);
        throw deleteError;
      }

      console.log('Delete operation completed successfully');
      
      // Refresh the patient list
      await fetchPatients();
      setPatientToDelete(null);

      toast({
        title: "Patient Deleted",
        description: "The patient and their prescriptions have been successfully deleted.",
      });
    } catch (error) {
      console.error('Error in delete operation:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete patient. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#7C3AED]">
            Patient Management
          </h2>
          <p className="text-sm text-gray-500">
            Manage and view all your patients
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-[300px] bg-white border-gray-200"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-100 bg-white shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Patient Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Contact Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Prescriptions
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <User className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-base">No patients found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <User className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {patient.patient_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            DOB: {new Date(patient.patient_dob).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {patient.patient_email && (
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {patient.patient_email}
                          </div>
                        )}
                        {patient.patient_phone && (
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {patient.patient_phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{patient.prescription_count} prescriptions</div>
                      <div className="text-sm text-gray-500">
                        Latest: {new Date(patient.latest_prescription).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:text-purple-700"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={(e) => handleDeleteClick(e, patient)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPatient && (
        <PatientDetailsDialog
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}

      <AlertDialog open={!!patientToDelete} onOpenChange={() => setPatientToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Patient</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this patient? This will also delete all their prescriptions. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}