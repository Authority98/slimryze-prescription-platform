export interface FormData {
  email: string;
  doctorName: string;
  npiNumber: string;
  deaNumber: string;
  clinicName: string;
  clinicAddress: string;
  clinicPhone: string;
  clinicFax: string;
  patientName: string;
  patientAddress: string;
  patientEmail: string;
  patientPhone: string;
  patientDOB: string;
  patientGender: string;
  quickNotes?: string;
  prescriptionTime: string;
  dosage: string;
  quantity: string;
  refills: string;
  instructions: string;
  ingredients: string;
  signature: string;
}