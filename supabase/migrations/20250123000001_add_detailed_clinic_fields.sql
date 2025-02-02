ALTER TABLE practitioners
DROP COLUMN IF EXISTS clinic_address,
ADD COLUMN IF NOT EXISTS clinic_street_address TEXT,
ADD COLUMN IF NOT EXISTS clinic_city TEXT,
ADD COLUMN IF NOT EXISTS clinic_state TEXT,
ADD COLUMN IF NOT EXISTS clinic_postal_code TEXT,
ADD COLUMN IF NOT EXISTS clinic_country TEXT DEFAULT 'United States';

-- Migrate existing data
UPDATE practitioners
SET clinic_street_address = clinic_address
WHERE clinic_address IS NOT NULL; 