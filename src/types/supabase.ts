export interface Database {
  public: {
    Tables: {
      practitioners: {
        Row: {
          id: string;
          full_name: string;
          license_number: string;
          clinic_name: string;
          clinic_address: string;
          clinic_phone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          license_number: string;
          clinic_name: string;
          clinic_address: string;
          clinic_phone: string;
        };
        Update: {
          full_name?: string;
          license_number?: string;
          clinic_name?: string;
          clinic_address?: string;
          clinic_phone?: string;
        };
      };
      prescriptions: {
        Row: {
          id: string;
          practitioner_id: string;
          patient_name: string;
          patient_dob: string;
          dosage: string;
          quantity: number;
          refills: number;
          instructions: string | null;
          signature: string;
          created_at: string;
          status: string;
        };
        Insert: {
          practitioner_id: string;
          patient_name: string;
          patient_dob: string;
          dosage: string;
          quantity: number;
          refills: number;
          instructions?: string;
          signature: string;
        };
        Update: {
          status?: string;
        };
      };
    };
  };
}