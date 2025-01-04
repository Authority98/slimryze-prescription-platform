import React from 'react';
import { User, Mail, BadgeCheck, Building2, MapPin, Phone } from 'lucide-react';
import { FormData } from '../../types/form';
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { readOnlyStyles } from '../../lib/readOnlyStyles';
import { FormFieldTooltip } from '../ui/form-field-tooltip';
import { TooltipProvider } from '../ui/tooltip';
import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';

interface Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PractitionerSection({ formData, onChange }: Props) {
  const { user } = useAuth();

  const guestMessage = "Sign up for an account using the button above to get started.";

  const loggedInMessage = (
    <span>
      This information is managed in your{' '}
      <Link 
        to="/admin/profile" 
        className="text-purple-600 hover:text-purple-700 font-medium"
      >
        practitioner profile
      </Link>
      .
    </span>
  );

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
                description="This is your registered email address"
                isReadOnly={true}
                customReadOnlyMessage={user ? loggedInMessage : guestMessage}
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={onChange}
                    className={`pl-10 ${readOnlyStyles.input}`}
                    required
                    readOnly
                  />
                </div>
              </FormFieldTooltip>
            </div>
            <div className="space-y-2">
              <FormFieldTooltip
                title="Doctor Name"
                description="Your full name as registered"
                isReadOnly={true}
                customReadOnlyMessage={user ? loggedInMessage : guestMessage}
              >
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="doctorName"
                    placeholder="Doctor Name"
                    value={formData.doctorName}
                    onChange={onChange}
                    className={`pl-10 ${readOnlyStyles.input}`}
                    required
                    readOnly
                  />
                </div>
              </FormFieldTooltip>
            </div>
            <div className="space-y-2">
              <FormFieldTooltip
                title="License Number"
                description="Your medical license number"
                isReadOnly={true}
                customReadOnlyMessage={user ? loggedInMessage : guestMessage}
              >
                <div className="relative">
                  <BadgeCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="licenseNumber"
                    placeholder="License Number"
                    value={formData.licenseNumber}
                    onChange={onChange}
                    className={`pl-10 ${readOnlyStyles.input}`}
                    required
                    readOnly
                  />
                </div>
              </FormFieldTooltip>
            </div>
            <div className="space-y-2">
              <FormFieldTooltip
                title="Clinic Name"
                description="Your registered clinic name"
                isReadOnly={true}
                customReadOnlyMessage={user ? loggedInMessage : guestMessage}
              >
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="clinicName"
                    placeholder="Clinic Name"
                    value={formData.clinicName}
                    onChange={onChange}
                    className={`pl-10 ${readOnlyStyles.input}`}
                    required
                    readOnly
                  />
                </div>
              </FormFieldTooltip>
            </div>
            <div className="space-y-2">
              <FormFieldTooltip
                title="Clinic Address"
                description="Your clinic's registered address"
                isReadOnly={true}
                customReadOnlyMessage={user ? loggedInMessage : guestMessage}
              >
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="clinicAddress"
                    placeholder="Clinic Address"
                    value={formData.clinicAddress}
                    onChange={onChange}
                    className={`pl-10 ${readOnlyStyles.input}`}
                    required
                    readOnly
                  />
                </div>
              </FormFieldTooltip>
            </div>
            <div className="space-y-2">
              <FormFieldTooltip
                title="Clinic Phone"
                description="Your clinic's contact number"
                isReadOnly={true}
                customReadOnlyMessage={user ? loggedInMessage : guestMessage}
              >
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    name="clinicPhone"
                    placeholder="Clinic Phone"
                    value={formData.clinicPhone}
                    onChange={onChange}
                    className={`pl-10 ${readOnlyStyles.input}`}
                    required
                    readOnly
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