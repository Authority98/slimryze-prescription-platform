export interface FormData {
  email: string;
  doctorFirstName: string;
  doctorLastName: string;
  npiNumber: string;
  deaNumber: string;
  clinicName: string;
  clinicStreetAddress: string;
  clinicCity: string;
  clinicState: string;
  clinicPostalCode: string;
  clinicCountry: string;
  clinicPhone: string;
  clinicFax: string;
  patientFirstName: string;
  patientLastName: string;
  patientStreetAddress: string;
  patientCity: string;
  patientState: string;
  patientPostalCode: string;
  patientCountry: string;
  patientEmail: string;
  patientPhone: string;
  patientGender: string;
  patientDob: string;
  quickNotes?: string;
  prescriptionTime: string;
  dosage: string;
  quantity: string;
  refills: string;
  instructions: string;
  ingredients: string;
  signature: string;
}