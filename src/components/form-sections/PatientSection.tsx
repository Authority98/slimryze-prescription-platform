import React from 'react';
import { User, Calendar, Mail, MapPin, Users, Phone } from 'lucide-react';
import { FormData } from '../../types/form';
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TooltipProvider } from "../ui/tooltip";
import { readOnlyStyles } from '../../lib/readOnlyStyles';
import { FormFieldTooltip } from '../ui/form-field-tooltip';

interface Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
}

export function PatientSection({ formData, onChange, isReadOnly }: Props) {
  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Auto-update date field if empty
  React.useEffect(() => {
    if (!formData.patientDOB) {
      onChange({
        target: {
          name: 'patientDOB',
          value: getTodayDate()
        }
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, []);

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormFieldTooltip
                title="Patient Name"
                description="Enter the patient's full name"
                isReadOnly={isReadOnly}
              >
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="patientName"
                    placeholder="Patient Name"
                    value={formData.patientName}
                    onChange={onChange}
                    className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="Patient Phone Number"
                description="Enter the patient's phone number"
                isReadOnly={isReadOnly}
              >
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    name="patientPhone"
                    placeholder="Patient Phone Number"
                    value={formData.patientPhone}
                    onChange={onChange}
                    className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="Date of Birth"
                description="Enter the patient's date of birth"
                isReadOnly={isReadOnly}
              >
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    name="patientDOB"
                    value={formData.patientDOB}
                    onChange={onChange}
                    className={`pl-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-inner-spin-button]:appearance-none ${isReadOnly ? readOnlyStyles.input : ''}`}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>
            </div>
            <div className="space-y-2">
              <FormFieldTooltip
                title="Patient Email"
                description="Enter the patient's email address"
                isReadOnly={isReadOnly}
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    name="patientEmail"
                    placeholder="Patient Email"
                    value={formData.patientEmail}
                    onChange={onChange}
                    className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="Patient Address"
                description="Enter the patient's full address"
                isReadOnly={isReadOnly}
              >
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="patientAddress"
                    placeholder="Patient Address"
                    value={formData.patientAddress}
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
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}