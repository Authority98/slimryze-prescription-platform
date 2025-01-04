import React from 'react';
import { Stethoscope, User, BadgeCheck, Building2, MapPin, Phone } from 'lucide-react';
import { FormData } from '../../types/form';
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PractitionerSection({ formData, onChange }: Props) {
  return (
    <Card>
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-purple-600" />
          <CardTitle>Practitioner Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                name="doctorName"
                placeholder="Doctor's Name"
                value={formData.doctorName}
                onChange={onChange}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <BadgeCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                value={formData.licenseNumber}
                onChange={onChange}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
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
          </div>
          <div className="space-y-2 md:col-span-2">
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
          </div>
          <div className="space-y-2">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}