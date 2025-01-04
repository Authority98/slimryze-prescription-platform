import React, { useState } from 'react';
import { Lock, Stethoscope, User, Pill, FileSignature } from 'lucide-react';
import { FormHeader } from './form-sections/FormHeader';
import { PractitionerSection } from './form-sections/PractitionerSection';
import { PatientSection } from './form-sections/PatientSection';
import { PrescriptionSection } from './form-sections/PrescriptionSection';
import { SignatureSection } from './form-sections/SignatureSection';
import { FormActions } from './form-sections/FormActions';
import { FormData } from '../types/form';

const initialFormData: FormData = {
  doctorName: '',
  licenseNumber: '',
  clinicName: '',
  clinicAddress: '',
  clinicPhone: '',
  patientName: '',
  patientDOB: '',
  dosage: '',
  quantity: '',
  refills: '',
  instructions: '',
  signature: '',
};

export default function PrescriptionForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => setFormData(initialFormData);

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
      <FormHeader />
      <PractitionerSection formData={formData} onChange={handleChange} />
      <PatientSection formData={formData} onChange={handleChange} />
      <PrescriptionSection formData={formData} onChange={handleChange} />
      <SignatureSection formData={formData} onChange={handleChange} />
      <FormActions onReset={handleReset} />
    </form>
  );
}