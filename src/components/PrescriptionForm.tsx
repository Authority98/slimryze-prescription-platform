import React, { useState, useEffect } from 'react';
import { Lock, Stethoscope, User, Pill, FileSignature } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { FormHeader } from './form-sections/FormHeader';
import { PractitionerSection } from './form-sections/PractitionerSection';
import { PatientSection } from './form-sections/PatientSection';
import { PrescriptionSection } from './form-sections/PrescriptionSection';
import { SignatureSection } from './form-sections/SignatureSection';
import { FormActions } from './form-sections/FormActions';
import { LoadingPage } from './ui/loading';
import { FormData } from '../types/form';

const initialFormData: FormData = {
  email: '',
  doctorName: '',
  licenseNumber: '',
  clinicName: '',
  clinicAddress: '',
  clinicPhone: '',
  patientName: '',
  patientDOB: '',
  prescriptionTime: '',
  dosage: '',
  quantity: '',
  refills: '',
  instructions: '',
  signature: '',
};

export default function PrescriptionForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPractitionerData();
  }, []);

  const loadPractitionerData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setFormData(prev => ({
          ...prev,
          email: user.email || '',
          doctorName: user.user_metadata.full_name || '',
          licenseNumber: user.user_metadata.license_number || '',
          clinicName: user.user_metadata.clinic_name || '',
          clinicAddress: user.user_metadata.clinic_address || '',
          clinicPhone: user.user_metadata.clinic_phone || '',
        }));
      }
    } catch (error) {
      console.error('Error loading practitioner data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(prev => ({
      ...initialFormData,
      // Keep practitioner data on reset
      email: prev.email,
      doctorName: prev.doctorName,
      licenseNumber: prev.licenseNumber,
      clinicName: prev.clinicName,
      clinicAddress: prev.clinicAddress,
      clinicPhone: prev.clinicPhone,
    }));
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-6 sm:py-12">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[length:50px_50px]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[300px] w-[300px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="h-[300px] w-[300px] bg-blue-500/10 rounded-full blur-3xl -translate-x-1/3" />
      </div>
      
      {/* Main form container */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Form content */}
        <div className="w-full p-8 space-y-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormHeader />
            <div className="space-y-6">
              <PractitionerSection formData={formData} onChange={handleChange} />
              <PatientSection formData={formData} onChange={handleChange} />
              <PrescriptionSection formData={formData} onChange={handleChange} />
              <SignatureSection formData={formData} onChange={handleChange} />
              <FormActions onReset={handleReset} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}