ALTER TABLE prescriptions
DROP COLUMN IF EXISTS patient_name,
ADD COLUMN IF NOT EXISTS patient_first_name TEXT,
ADD COLUMN IF NOT EXISTS patient_last_name TEXT,
ADD COLUMN IF NOT EXISTS patient_street_address TEXT,
ADD COLUMN IF NOT EXISTS patient_city TEXT,
ADD COLUMN IF NOT EXISTS patient_state TEXT,
ADD COLUMN IF NOT EXISTS patient_postal_code TEXT,
ADD COLUMN IF NOT EXISTS patient_country TEXT DEFAULT 'United States';

-- Migrate existing data
UPDATE prescriptions
SET patient_first_name = split_part(patient_name, ' ', 1),
    patient_last_name = array_to_string(string_to_array(patient_name, ' ')[2:], ' ')
WHERE patient_name IS NOT NULL; 