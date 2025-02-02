import React from 'react';
import { User, Building2, Phone, Hash, FileText, Printer, Mail, MapPin } from 'lucide-react';
import { FormData } from '../../types/form';
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TooltipProvider } from "../ui/tooltip";
import { FormFieldTooltip } from '../ui/form-field-tooltip';
import { cn } from "../../lib/utils";

interface Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
}

export function PractitionerSection({ formData, onChange, isReadOnly = false }: Props) {
  const tooltipMessage = isReadOnly ? "Please sign in to edit this field." : undefined;

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
                description={tooltipMessage || "Enter the practitioner's email address"}
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={onChange}
                    className={cn(
                      "pl-10",
                      isReadOnly && "bg-muted"
                    )}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="First Name"
                description={tooltipMessage || "Enter the doctor's first name"}
              >
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="doctorFirstName"
                    placeholder="First Name"
                    value={formData.doctorFirstName}
                    onChange={onChange}
                    className={cn(
                      "pl-10",
                      isReadOnly && "bg-muted"
                    )}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="Clinic Address"
                description={tooltipMessage || "Enter the clinic's full address"}
              >
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="clinicAddress"
                    placeholder="Clinic Address"
                    value={formData.clinicAddress}
                    onChange={onChange}
                    className={cn(
                      "pl-10",
                      isReadOnly && "bg-muted"
                    )}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="Clinic Phone"
                description={tooltipMessage || "Enter the clinic's phone number"}
              >
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    name="clinicPhone"
                    placeholder="Clinic Phone"
                    value={formData.clinicPhone}
                    onChange={onChange}
                    className={cn(
                      "pl-10",
                      isReadOnly && "bg-muted"
                    )}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>
            </div>

            <div className="space-y-2">
              <FormFieldTooltip
                title="Clinic Name"
                description={tooltipMessage || "Enter the clinic or practice name"}
              >
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="clinicName"
                    placeholder="Clinic Name"
                    value={formData.clinicName}
                    onChange={onChange}
                    className={cn(
                      "pl-10",
                      isReadOnly && "bg-muted"
                    )}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="Last Name"
                description={tooltipMessage || "Enter the doctor's last name"}
              >
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="doctorLastName"
                    placeholder="Last Name"
                    value={formData.doctorLastName}
                    onChange={onChange}
                    className={cn(
                      "pl-10",
                      isReadOnly && "bg-muted"
                    )}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="DEA Number"
                description={tooltipMessage || "Enter the Drug Enforcement Administration (DEA) number"}
              >
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="deaNumber"
                    placeholder="DEA Number"
                    value={formData.deaNumber}
                    onChange={onChange}
                    className={cn(
                      "pl-10",
                      isReadOnly && "bg-muted"
                    )}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="Clinic Fax"
                description={tooltipMessage || "Enter the clinic's fax number"}
              >
                <div className="relative">
                  <Printer className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    name="clinicFax"
                    placeholder="Clinic Fax"
                    value={formData.clinicFax}
                    onChange={onChange}
                    className={cn(
                      "pl-10",
                      isReadOnly && "bg-muted"
                    )}
                    required
                    readOnly={isReadOnly}
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