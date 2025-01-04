import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FormHeader } from './form-sections/FormHeader';
import { FormFooter } from './form-sections/FormFooter';
import { PractitionerSection } from './form-sections/PractitionerSection';
import { PatientSection } from './form-sections/PatientSection';
import { PrescriptionSection } from './form-sections/PrescriptionSection';
import { SignatureSection } from './form-sections/SignatureSection';
import { FormActions } from './form-sections/FormActions';
import { LoadingPage } from './ui/loading';
import { FormData } from '../types/form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import { TooltipProvider } from './ui/tooltip';

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
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadPractitionerData();
    } else {
      setLoading(false);
    }
  }, [user]);

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && formRef.current) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Prescription</title>
            <link rel="stylesheet" href="/src/index.css">
            <style>
              @media print {
                body { padding: 20px; }
                button { display: none; }
                .print-only { display: block; }
              }
            </style>
          </head>
          <body>
            ${formRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background relative overflow-hidden py-6 sm:py-12">
        {/* Decorative elements for the entire page */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[length:50px_50px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[300px] w-[300px] bg-purple-500/10 rounded-full blur-3xl" />
          <div className="h-[300px] w-[300px] bg-blue-500/10 rounded-full blur-3xl -translate-x-1/3" />
        </div>

        {/* Main content container */}
        <div className="relative w-full max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {/* Header */}
            <FormHeader 
              formData={formData}
              onSignOut={handleSignOut}
              onPrint={handlePrint}
            />

            {/* Form */}
            <div ref={formRef}>
              <div className="w-full p-8 space-y-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-6">
                    <PractitionerSection formData={formData} onChange={handleChange} />
                    <PatientSection formData={formData} onChange={handleChange} isReadOnly={!user} />
                    <PrescriptionSection formData={formData} onChange={handleChange} isReadOnly={!user} />
                    <SignatureSection formData={formData} onChange={handleChange} isReadOnly={!user} />
                    <FormActions onReset={handleReset} isReadOnly={!user} />
                    <FormFooter />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}