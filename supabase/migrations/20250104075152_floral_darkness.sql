/*
  # Initial Schema Setup for SlimRyze Admin

  1. New Tables
    - `practitioners`
      - `id` (uuid, primary key, matches auth.users.id)
      - `full_name` (text)
      - `license_number` (text)
      - `clinic_name` (text)
      - `clinic_address` (text)
      - `clinic_phone` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `prescriptions`
      - `id` (uuid, primary key)
      - `practitioner_id` (uuid, foreign key)
      - `patient_name` (text)
      - `patient_dob` (date)
      - `patient_email` (text)
      - `patient_phone` (text)
      - `patient_address` (text)
      - `patient_gender` (text)
      - `dosage` (text)
      - `quantity` (integer)
      - `refills` (integer)
      - `instructions` (text)
      - `ingredients` (text)
      - `signature` (text)
      - `created_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for practitioners to manage their profiles
    - Add policies for practitioners to manage their prescriptions
*/

-- Create practitioners table
CREATE TABLE practitioners (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  license_number TEXT NOT NULL UNIQUE,
  clinic_name TEXT NOT NULL,
  clinic_address TEXT NOT NULL,
  clinic_phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create prescriptions table
CREATE TABLE prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practitioner_id UUID NOT NULL REFERENCES practitioners(id),
  patient_name TEXT NOT NULL,
  patient_dob DATE NOT NULL,
  patient_email TEXT,
  patient_phone TEXT,
  patient_address TEXT,
  patient_gender TEXT,
  dosage TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  refills INTEGER NOT NULL,
  instructions TEXT,
  ingredients TEXT,
  signature TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE practitioners ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;

-- Policies for practitioners
CREATE POLICY "Users can view own practitioner profile"
  ON practitioners
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own practitioner profile"
  ON practitioners
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own practitioner profile"
  ON practitioners
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policies for prescriptions
CREATE POLICY "Practitioners can view own prescriptions"
  ON prescriptions
  FOR SELECT
  TO authenticated
  USING (practitioner_id = auth.uid());

CREATE POLICY "Practitioners can insert own prescriptions"
  ON prescriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (practitioner_id = auth.uid());

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for practitioners
CREATE TRIGGER update_practitioners_updated_at
  BEFORE UPDATE ON practitioners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();