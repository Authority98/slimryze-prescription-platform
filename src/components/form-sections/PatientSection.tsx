import React, { useCallback } from 'react';
import { User, Calendar, Mail, MapPin, Users, Phone, Search, Info } from 'lucide-react';
import { FormData } from '../../types/form';
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TooltipProvider } from "../ui/tooltip";
import { readOnlyStyles } from '../../lib/readOnlyStyles';
import { FormFieldTooltip } from '../ui/form-field-tooltip';
import { Button } from '../ui/button';
import { supabase } from '../../lib/supabaseClient';
import { useToast } from '../ui/use-toast';
import { debounce } from 'lodash';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

interface Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
}

export function PatientSection({ formData, onChange, isReadOnly }: Props) {
  const { toast } = useToast();

  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handlePatientLookup = async (searchField: 'email' | 'phone', searchValue: string) => {
    if (!searchValue) return;

    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select('*')
        .eq(`patient_${searchField}`, searchValue)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        // Get the most recent prescription
        const mostRecent = data[0];
        
        // Update form with found patient data
        const updates = {
          patientFirstName: mostRecent.patient_first_name,
          patientLastName: mostRecent.patient_last_name,
          patientEmail: mostRecent.patient_email,
          patientPhone: mostRecent.patient_phone,
          patientStreetAddress: mostRecent.patient_street_address,
          patientCity: mostRecent.patient_city,
          patientState: mostRecent.patient_state,
          patientPostalCode: mostRecent.patient_postal_code,
          patientCountry: mostRecent.patient_country,
          patientGender: mostRecent.patient_gender,
        };

        Object.entries(updates).forEach(([key, value]) => {
          onChange({
            target: {
              name: key,
              value: value || ''
            }
          } as React.ChangeEvent<HTMLInputElement>);
        });

        toast({
          title: "Success",
          description: "Patient information loaded successfully",
        });
      }
    } catch (error: any) {
      console.error('Error fetching patient data:', error);
    }
  };

  // Create debounced versions of the lookup function
  const debouncedLookup = useCallback(
    debounce((field: 'email' | 'phone', value: string) => {
      handlePatientLookup(field, value);
    }, 500),
    []
  );

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(e);

    // Trigger auto-search for email and phone fields
    if (name === 'patientEmail') {
      debouncedLookup('email', value);
    } else if (name === 'patientPhone') {
      debouncedLookup('phone', value);
    }
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            <CardTitle>Patient Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormFieldTooltip
                title="First Name"
                description="Enter the patient's first name"
                isReadOnly={isReadOnly}
              >
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="patientFirstName"
                    placeholder="First Name"
                    value={formData.patientFirstName}
                    onChange={onChange}
                    className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>
            </div>

            <div className="space-y-4">
              <FormFieldTooltip
                title="Last Name"
                description="Enter the patient's last name"
                isReadOnly={isReadOnly}
              >
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="patientLastName"
                    placeholder="Last Name"
                    value={formData.patientLastName}
                    onChange={onChange}
                    className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>
            </div>

            <div className="space-y-4">
              <FormFieldTooltip
                title="Email"
                description="Enter the patient's email address"
                isReadOnly={isReadOnly}
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    name="patientEmail"
                    placeholder="Email Address"
                    value={formData.patientEmail}
                    onChange={handleInputChange}
                    className={`pl-10 pr-8 ${isReadOnly ? readOnlyStyles.input : ''}`}
                    required
                    readOnly={isReadOnly}
                  />
                  {!isReadOnly && (
                    <div className="absolute right-3 top-3">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Type to auto-fetch patient data</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </FormFieldTooltip>
            </div>

            <div className="space-y-4">
              <FormFieldTooltip
                title="Phone Number"
                description="Enter the patient's phone number"
                isReadOnly={isReadOnly}
              >
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    name="patientPhone"
                    placeholder="Phone Number"
                    value={formData.patientPhone}
                    onChange={handleInputChange}
                    className={`pl-10 pr-8 ${isReadOnly ? readOnlyStyles.input : ''}`}
                    required
                    readOnly={isReadOnly}
                  />
                  {!isReadOnly && (
                    <div className="absolute right-3 top-3">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Type to auto-fetch patient data</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </FormFieldTooltip>
            </div>

            <div className="col-span-2 space-y-4">
              <FormFieldTooltip
                title="Street Address"
                description="Enter the patient's street address"
                isReadOnly={isReadOnly}
              >
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="patientStreetAddress"
                    placeholder="Street Address"
                    value={formData.patientStreetAddress}
                    onChange={onChange}
                    className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>

              <div className="grid grid-cols-4 gap-4">
                <FormFieldTooltip
                  title="City"
                  description="Enter the patient's city"
                  isReadOnly={isReadOnly}
                >
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      name="patientCity"
                      placeholder="City"
                      value={formData.patientCity}
                      onChange={onChange}
                      className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                      required
                      readOnly={isReadOnly}
                    />
                  </div>
                </FormFieldTooltip>

                <FormFieldTooltip
                  title="State"
                  description="Enter the patient's state"
                  isReadOnly={isReadOnly}
                >
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      name="patientState"
                      placeholder="State"
                      value={formData.patientState}
                      onChange={onChange}
                      className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                      required
                      readOnly={isReadOnly}
                    />
                  </div>
                </FormFieldTooltip>

                <FormFieldTooltip
                  title="Postal Code"
                  description="Enter the patient's postal code"
                  isReadOnly={isReadOnly}
                >
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      name="patientPostalCode"
                      placeholder="Postal Code"
                      value={formData.patientPostalCode}
                      onChange={onChange}
                      className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                      required
                      readOnly={isReadOnly}
                    />
                  </div>
                </FormFieldTooltip>

                <FormFieldTooltip
                  title="Country"
                  description="Enter the patient's country"
                  isReadOnly={isReadOnly}
                >
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      name="patientCountry"
                      placeholder="Country"
                      value={formData.patientCountry}
                      onChange={onChange}
                      className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                      required
                      readOnly={isReadOnly}
                      defaultValue="US"
                    />
                  </div>
                </FormFieldTooltip>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormFieldTooltip
                  title="Date of Birth"
                  description="Enter the patient's date of birth"
                  isReadOnly={isReadOnly}
                >
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      name="patientDob"
                      placeholder="Date of Birth"
                      value={formData.patientDob}
                      onChange={onChange}
                      className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                      required
                      readOnly={isReadOnly}
                    />
                  </div>
                </FormFieldTooltip>

                <FormFieldTooltip
                  title="Gender"
                  description="Select the patient's gender"
                  isReadOnly={isReadOnly}
                >
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <select
                      name="patientGender"
                      value={formData.patientGender}
                      onChange={onChange as any}
                      className={`w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${isReadOnly ? readOnlyStyles.input : ''}`}
                      required
                      disabled={isReadOnly}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </FormFieldTooltip>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}