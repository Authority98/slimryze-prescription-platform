import React from 'react';
import { User, Calendar, Clock } from 'lucide-react';
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

  // Function to get current time in HH:MM format
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Auto-update date and time fields if empty
  React.useEffect(() => {
    if (!formData.patientDOB) {
      onChange({
        target: {
          name: 'patientDOB',
          value: getTodayDate()
        }
      } as React.ChangeEvent<HTMLInputElement>);
    }
    if (!formData.prescriptionTime) {
      onChange({
        target: {
          name: 'prescriptionTime',
          value: getCurrentTime()
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
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <FormFieldTooltip
                  title="Prescription Date"
                  description="Automatically set to today's date. You can edit this in your dashboard."
                  isReadOnly={isReadOnly}
                >
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      name="patientDOB"
                      placeholder="Date of Birth"
                      value={formData.patientDOB}
                      onChange={onChange}
                      className={`pl-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-inner-spin-button]:appearance-none ${isReadOnly ? readOnlyStyles.input : ''}`}
                      required
                      readOnly={isReadOnly}
                    />
                  </div>
                </FormFieldTooltip>

                <FormFieldTooltip
                  title="Prescription Time"
                  description="Automatically set to current time. You can edit this in your dashboard."
                  isReadOnly={isReadOnly}
                >
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="time"
                      name="prescriptionTime"
                      value={formData.prescriptionTime}
                      onChange={onChange}
                      className={`pl-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-inner-spin-button]:appearance-none ${isReadOnly ? readOnlyStyles.input : ''}`}
                      required
                      readOnly={isReadOnly}
                    />
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