import React from 'react';
import { User, Building2, Phone, Hash, FileText, Printer, Mail, MapPin } from 'lucide-react';
import { FormData } from '../../types/form';
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TooltipProvider } from "../ui/tooltip";
import { FormFieldTooltip } from '../ui/form-field-tooltip';

interface Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PractitionerSection({ formData, onChange }: Props) {
  return (
    <TooltipProvider>
      <Card>
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            <CardTitle>Practitioner Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormFieldTooltip
                title="Email"
                description="Enter the practitioner's email address"
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={onChange}
                    className="pl-10"
                    required
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="Doctor Name"
                description="Enter the doctor's full name"
              >
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="doctorName"
                    placeholder="Doctor Name"
                    value={formData.doctorName}
                    onChange={onChange}
                    className="pl-10"
                    required
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="NPI Number"
                description="Enter the National Provider Identifier (NPI) number"
              >
                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="npiNumber"
                    placeholder="NPI Number"
                    value={formData.npiNumber}
                    onChange={onChange}
                    className="pl-10"
                    required
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="Clinic Phone"
                description="Enter the clinic's phone number"
              >
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    name="clinicPhone"
                    placeholder="Clinic Phone"
                    value={formData.clinicPhone}
                    onChange={onChange}
                    className="pl-10"
                    required
                  />
                </div>
              </FormFieldTooltip>
            </div>

            <div className="space-y-2">
              <FormFieldTooltip
                title="Clinic Name"
                description="Enter the clinic or practice name"
              >
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="clinicName"
                    placeholder="Clinic Name"
                    value={formData.clinicName}
                    onChange={onChange}
                    className="pl-10"
                    required
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="Clinic Address"
                description="Enter the clinic's full address"
              >
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="clinicAddress"
                    placeholder="Clinic Address"
                    value={formData.clinicAddress}
                    onChange={onChange}
                    className="pl-10"
                    required
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="DEA Number"
                description="Enter the Drug Enforcement Administration (DEA) number"
              >
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="deaNumber"
                    placeholder="DEA Number"
                    value={formData.deaNumber}
                    onChange={onChange}
                    className="pl-10"
                    required
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="Clinic Fax"
                description="Enter the clinic's fax number"
              >
                <div className="relative">
                  <Printer className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    name="clinicFax"
                    placeholder="Clinic Fax"
                    value={formData.clinicFax}
                    onChange={onChange}
                    className="pl-10"
                    required
                  />
                </div>
              </FormFieldTooltip>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}