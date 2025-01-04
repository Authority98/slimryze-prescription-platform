/*
  # Update Schema for SlimRyze Admin

  1. Changes
    - Safely check for existing tables before creation
    - Add RLS policies if not exists
    - Add triggers for updated_at timestamps
  
  2. Security
    - Enable RLS on both tables
    - Add policies for practitioners to manage their profiles
    - Add policies for practitioners to manage their prescriptions
*/

-- Safely create practitioners table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'practitioners') THEN
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
  END IF;
END $$;

-- Safely create prescriptions table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'prescriptions') THEN
    CREATE TABLE prescriptions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      practitioner_id UUID NOT NULL REFERENCES practitioners(id),
      patient_name TEXT NOT NULL,
      patient_dob DATE NOT NULL,
      dosage TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      refills INTEGER NOT NULL,
      instructions TEXT,
      signature TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now(),
      status TEXT NOT NULL DEFAULT 'pending'
    );
  END IF;
END $$;

-- Enable RLS (safe to run multiple times)
ALTER TABLE practitioners ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
  -- Practitioners policies
  DROP POLICY IF EXISTS "Users can view own practitioner profile" ON practitioners;
  DROP POLICY IF EXISTS "Users can update own practitioner profile" ON practitioners;
  DROP POLICY IF EXISTS "Users can insert own practitioner profile" ON practitioners;
  
  -- Prescriptions policies
  DROP POLICY IF EXISTS "Practitioners can view own prescriptions" ON prescriptions;
  DROP POLICY IF EXISTS "Practitioners can insert own prescriptions" ON prescriptions;
END $$;

-- Create new policies
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

-- Safely create trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Safely create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_practitioners_updated_at'
  ) THEN
    CREATE TRIGGER update_practitioners_updated_at
      BEFORE UPDATE ON practitioners
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;