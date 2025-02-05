import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FormHeader } from './form-sections/FormHeader';
import { FormFooter } from './form-sections/FormFooter';
import { PractitionerSection } from './form-sections/PractitionerSection';
import { PatientSection } from './form-sections/PatientSection';
import { PrescriptionSection } from './form-sections/PrescriptionSection';
import { IngredientsSection } from './form-sections/IngredientsSection';
import { SignatureSection } from './form-sections/SignatureSection';
import { FormActions } from './form-sections/FormActions';
import { LoadingPage } from './ui/loading';
import { FormData } from '../types/form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import { TooltipProvider } from './ui/tooltip';
import { useToast } from './ui/use-toast';

interface PrescriptionData {
  practitioner_id: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  patient_address: string;
  patient_gender: string;
  patient_dob: string;
  dosage: string;
  quantity: number;
  refills: number;
  instructions: string;
  signature: string;
  ingredients?: string;
}

const initialFormData: FormData = {
  email: '',
  doctorFirstName: '',
  doctorLastName: '',
  npiNumber: '',
  deaNumber: '',
  clinicName: '',
  clinicAddress: '',
  clinicPhone: '',
  clinicFax: '',
  patientFirstName: '',
  patientLastName: '',
  patientStreetAddress: '',
  patientCity: '',
  patientState: '',
  patientPostalCode: '',
  patientCountry: 'US',
  patientEmail: '',
  patientPhone: '',
  patientGender: '',
  patientDob: '',
  prescriptionTime: '',
  dosage: '',
  quantity: '',
  refills: '',
  instructions: 'Take ONE to TWO capsules by mouth at 9:00 AM as directed by your prescriber. It is advisable to take a multivitamin supplement once a day.',
  ingredients: `1. Topiramate    15mg: Appetite suppression and other metabolic pathways
2. Caffeine      20mg: Promotes lipolysis and thermogenesis.
3. Bupropion     30mg: Moderates side effects of weight loss
4. Naltrexone    3mg: Moderates appetite and cravings
5. Phentermine   12.5mg: Reduces appetite and food consumption
6. Metformin     250mg: Reduces insulin resistance preventing the conversion of carbohydrates into fat
7. Methycobalamin 500mg - Boosts metabolism and energy`,
  signature: '',
};

export default function PrescriptionForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formLoading, setFormLoading] = useState(true);
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadPractitionerData();
    } else {
      setFormLoading(false);
    }
  }, [user]);

  const loadPractitionerData = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;

      if (!user) return;

      const fullName = user.user_metadata.full_name || '';
      const [firstName = '', lastName = ''] = fullName.split(' ');
      
      // Validate and format address components
      const addressComponents = [
        user.user_metadata.clinic_street_address,
        user.user_metadata.clinic_city,
        user.user_metadata.clinic_state,
        user.user_metadata.clinic_postal_code,
        user.user_metadata.clinic_country || 'US'
      ].filter(Boolean);
  
      const formattedAddress = addressComponents.length > 0 
        ? addressComponents.join(', ')
        : '';
      
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        doctorFirstName: firstName.trim(),
        doctorLastName: lastName.trim(),
        npiNumber: user.user_metadata.npi_number || '',
        deaNumber: user.user_metadata.dea_number || '',
        clinicName: user.user_metadata.clinic_name || '',
        clinicStreetAddress: user.user_metadata.clinic_street_address || '',
        clinicCity: user.user_metadata.clinic_city || '',
        clinicState: user.user_metadata.clinic_state || '',
        clinicPostalCode: user.user_metadata.clinic_postal_code || '',
        clinicCountry: user.user_metadata.clinic_country || 'US',
        clinicPhone: user.user_metadata.clinic_phone || '',
        clinicFax: user.user_metadata.clinic_fax || '',
      }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load practitioner data. Please try again."
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setFormLoading(true);
    try {
      const { data: practitioner, error: practitionerError } = await supabase
        .from('practitioners')
        .select('id')
        .eq('id', user.id)
        .single();

      if (practitionerError) {
        const practitionerData = {
          id: user.id,
          full_name: `${formData.doctorFirstName} ${formData.doctorLastName}`,
          license_number: formData.npiNumber,
          clinic_name: formData.clinicName,
          clinic_address: formData.clinicAddress,
          clinic_phone: formData.clinicPhone
        };

        const { error: insertError } = await supabase
          .from('practitioners')
          .insert([practitionerData]);

        if (insertError) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to create practitioner profile. Please try again.",
          });
          throw new Error('Failed to create practitioner profile. Please try again.');
        }
      }

      const prescriptionData: PrescriptionData = {
        practitioner_id: user.id,
        patient_name: `${formData.patientFirstName} ${formData.patientLastName}`,
        patient_email: formData.patientEmail,
        patient_phone: formData.patientPhone,
        patient_address: `${formData.patientStreetAddress}, ${formData.patientCity}, ${formData.patientState} ${formData.patientPostalCode}, ${formData.patientCountry}`,
        patient_gender: formData.patientGender,
        patient_dob: formData.patientDob,
        dosage: formData.dosage,
        quantity: parseInt(formData.quantity),
        refills: parseInt(formData.refills),
        instructions: formData.instructions,
        signature: formData.signature
      };

      if (formData.ingredients) {
        prescriptionData.ingredients = formData.ingredients;
      }

      const { error } = await supabase
        .from('prescriptions')
        .insert([prescriptionData]);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to submit prescription. Please try again.",
        });
        throw error;
      }

      toast({
        title: "Success",
        description: "Prescription submitted successfully!",
      });

      handleReset();
      navigate('/admin/prescriptions');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || 'Failed to submit prescription. Please try again.',
      });
    } finally {
      setFormLoading(false);
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
      doctorFirstName: prev.doctorFirstName,
      doctorLastName: prev.doctorLastName,
      npiNumber: prev.npiNumber,
      deaNumber: prev.deaNumber,
      clinicName: prev.clinicName,
      clinicAddress: prev.clinicAddress,
      clinicPhone: prev.clinicPhone,
      clinicFax: prev.clinicFax,
    }));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handlePrint = () => {
    window.print();
  };

  if (authLoading || formLoading) {
    return <LoadingPage />;
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background relative overflow-hidden py-6 sm:py-12">
        {/* Enhanced decorative elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] print-hide" />
        <div className="absolute inset-0 flex items-center justify-center print-hide">
          <div className="h-[500px] w-[500px] bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="h-[400px] w-[400px] bg-gradient-to-bl from-pink-500/20 to-indigo-500/20 rounded-full blur-3xl -translate-x-1/3 animate-pulse delay-700" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background print-hide" />

        {/* Main content container */}
        <div className="relative w-full max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {/* Header */}
            <div className="print-hide">
              <FormHeader 
                formData={formData}
                onSignOut={handleSignOut}
              />
            </div>

            {/* Form */}
            <div ref={formRef}>
              <div className="w-full p-8 space-y-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-6">
                    <PractitionerSection formData={formData} onChange={handleChange} isReadOnly={!user} />
                    <PatientSection formData={formData} onChange={handleChange} isReadOnly={!user} />
                    <PrescriptionSection formData={formData} onChange={handleChange} isReadOnly={!user} />
                    <IngredientsSection formData={formData} isReadOnly={!user} />
                    <SignatureSection formData={formData} onChange={handleChange} isReadOnly={!user} />
                    <div className="print-hide">
                      <FormActions onPrint={handlePrint} isReadOnly={!user} />
                      <FormFooter />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <style>
          {`
            @media print {
              /* Reset print styles */
              body {
                padding: 20px !important;
                margin: 0 !important;
                background: white !important;
              }

              /* Hide non-printable elements */
              .print-hide,
              button, 
              [type="submit"] {
                display: none !important;
              }

              /* Maintain grid layout in print */
              .grid {
                display: grid !important;
              }
              
              .grid-cols-1.md\\:grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              }

              /* Card styles */
              .card {
                background: white !important;
                border: 1px solid #e5e7eb !important;
                border-radius: 0.5rem !important;
                margin-bottom: 1.5rem !important;
              }

              /* Card header styles */
              .card-header {
                padding: 1.5rem !important;
                padding-bottom: 1rem !important;
                border-bottom: 1px solid #f3f4f6 !important;
              }

              /* Card content styles */
              .card-content {
                padding: 1.5rem !important;
              }

              /* Ensure gradients are visible */
              .bg-gradient-to-r {
                background: #7c3aed !important;
                -webkit-text-fill-color: #7c3aed !important;
              }

              /* Ensure text is visible */
              .text-transparent {
                -webkit-text-fill-color: #7c3aed !important;
              }

              /* Maintain spacing */
              .space-y-6 {
                margin-top: 1.5rem !important;
              }

              /* Ensure icons are visible */
              .text-purple-500, 
              .text-purple-600,
              .text-muted-foreground {
                color: #7c3aed !important;
              }

              /* Ensure backgrounds are visible */
              .bg-purple-100 {
                background-color: #f3e8ff !important;
              }

              /* Maintain gaps and padding */
              .gap-4 {
                gap: 1rem !important;
              }
              .gap-6 {
                gap: 1.5rem !important;
              }
              .p-4, .p-6, .p-8 {
                padding: 1rem !important;
              }

              /* Ensure rounded corners */
              .rounded-lg {
                border-radius: 0.5rem !important;
              }

              /* Add subtle borders */
              .bg-white\\/80,
              .bg-white\\/50 {
                background: white !important;
                border: 1px solid #e5e7eb !important;
              }

              /* Remove decorative elements */
              .bg-grid-slate-100,
              .bg-purple-500\\/10,
              .bg-blue-500\\/10,
              .blur-3xl {
                display: none !important;
              }

              /* Ensure form sections are visible */
              .backdrop-blur-xl {
                backdrop-filter: none !important;
                background: white !important;
              }

              /* Adjust input fields */
              input, select, textarea {
                border: none !important;
                background: transparent !important;
                padding: 0 !important;
                color: black !important;
                font-size: 0.875rem !important;
              }

              /* Ensure labels are visible */
              label {
                color: #6b7280 !important;
                font-size: 0.875rem !important;
                font-weight: 500 !important;
              }

              /* Table styles for ingredients */
              table {
                width: 100% !important;
                border-collapse: collapse !important;
              }

              th {
                background-color: #f9fafb !important;
                color: #6b7280 !important;
                font-weight: 500 !important;
                text-align: left !important;
                padding: 0.75rem 1rem !important;
                border-bottom: 1px solid #e5e7eb !important;
              }

              td {
                padding: 0.75rem 1rem !important;
                border-bottom: 1px solid #e5e7eb !important;
                color: #111827 !important;
              }

              tr:hover {
                background-color: #f9fafb !important;
              }

              /* Section titles */
              .card-title {
                font-size: 1.125rem !important;
                font-weight: 600 !important;
                color: #111827 !important;
              }

              /* Icons in section headers */
              .card-header .text-purple-600 {
                width: 1.25rem !important;
                height: 1.25rem !important;
              }

              /* Form field icons */
              .text-muted-foreground {
                width: 1rem !important;
                height: 1rem !important;
              }

              /* Shadow removal */
              .shadow-2xl,
              .shadow-sm,
              .shadow-lg {
                box-shadow: none !important;
              }

              /* Ensure white background */
              * {
                background-color: transparent !important;
              }

              /* Fix icon alignment in headers and fields */
              .flex.items-center {
                display: flex !important;
                align-items: center !important;
              }

              .flex.items-center.gap-2 {
                gap: 0.5rem !important;
              }

              /* Section header icon container */
              .p-2.rounded-full {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                margin-right: 0.5rem !important;
              }

              /* Form field icon positioning */
              .relative {
                position: relative !important;
              }

              .absolute {
                position: absolute !important;
              }

              .left-3 {
                left: 0.75rem !important;
              }

              .top-3 {
                top: 0.75rem !important;
              }

              /* Icon sizing */
              .w-4 {
                width: 1rem !important;
              }

              .h-4 {
                height: 1rem !important;
              }

              .w-5 {
                width: 1.25rem !important;
              }

              .h-5 {
                height: 1.25rem !important;
              }

              /* Ensure proper text alignment with icons */
              input.pl-10,
              select.pl-10,
              textarea.pl-10 {
                padding-left: 2.5rem !important;
              }

              /* Fix signature section text */
              .text-sm.text-muted-foreground {
                display: block !important;
                margin-top: 0.5rem !important;
                font-style: italic !important;
                color: #4b5563 !important;
                font-size: 0.875rem !important;
                line-height: 1.25rem !important;
                opacity: 1 !important;
                visibility: visible !important;
              }

              /* Ensure all text is visible */
              [class*="text-"] {
                color: #111827 !important;
                opacity: 1 !important;
                visibility: visible !important;
              }

              /* Specific styles for signature text */
              p[class*="text-sm"] {
                display: block !important;
                color: #4b5563 !important;
                font-size: 0.875rem !important;
                line-height: 1.25rem !important;
                margin-top: 0.5rem !important;
                font-style: italic !important;
                opacity: 1 !important;
                visibility: visible !important;
              }
            }
          `}
        </style>
      </div>
    </TooltipProvider>
  );
}