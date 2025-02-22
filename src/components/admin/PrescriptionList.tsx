import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { LoadingPage } from '../ui/loading';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Plus, FileText, Calendar, User, Pill, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PrescriptionDetailsDialog } from './PrescriptionDetailsDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useToast } from "../ui/use-toast";

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
  const [prescriptionToDelete, setPrescriptionToDelete] = useState<Prescription | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load prescriptions. Please try again.",
      });
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

  const handleDeleteClick = (e: React.MouseEvent, prescription: Prescription) => {
    e.stopPropagation();
    setPrescriptionToDelete(prescription);
  };

  const handleDeleteConfirm = async () => {
    if (!prescriptionToDelete) return;

    try {
      console.log('Starting delete operation for prescription:', prescriptionToDelete.id);
      setLoading(true);
      
      // First, verify the prescription exists
      const { data: existingData, error: checkError } = await supabase
        .from('prescriptions')
        .select('id')
        .eq('id', prescriptionToDelete.id)
        .single();

      if (checkError) {
        console.error('Error checking prescription:', checkError);
        throw checkError;
      }

      console.log('Found prescription to delete:', existingData);
      
      // Perform the delete operation
      const { error: deleteError } = await supabase
        .from('prescriptions')
        .delete()
        .eq('id', prescriptionToDelete.id);

      if (deleteError) {
        console.error('Error during delete:', deleteError);
        throw deleteError;
      }

      console.log('Delete operation completed successfully');

      // Verify the deletion
      const { data: verifyData, error: verifyError } = await supabase
        .from('prescriptions')
        .select('id')
        .eq('id', prescriptionToDelete.id)
        .maybeSingle();

      if (verifyError) {
        console.error('Error verifying deletion:', verifyError);
        throw verifyError;
      }

      if (verifyData) {
        console.error('Prescription still exists after deletion!');
        throw new Error('Deletion failed - prescription still exists');
      }

      console.log('Verified prescription was deleted');

      // Reload prescriptions to ensure we have the latest data
      console.log('Reloading prescriptions after delete...');
      await loadPrescriptions();
      setPrescriptionToDelete(null);

      console.log('Delete process completed, showing success toast');
      toast({
        title: "Prescription Deleted",
        description: "The prescription has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error in delete operation:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete prescription. Please try again.",
      });
    } finally {
      setLoading(false);
    }
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
                      <div className="flex justify-end gap-2">
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
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={(e) => handleDeleteClick(e, prescription)}
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
      </Card>

      <PrescriptionDetailsDialog
        prescription={selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
      />

      <AlertDialog open={!!prescriptionToDelete} onOpenChange={() => setPrescriptionToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Prescription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this prescription? This action cannot be undone.
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