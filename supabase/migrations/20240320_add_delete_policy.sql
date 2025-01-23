-- Add delete policy for prescriptions table
CREATE POLICY "Enable delete for users based on practitioner_id" 
ON public.prescriptions
FOR DELETE
USING (auth.uid() = practitioner_id); 