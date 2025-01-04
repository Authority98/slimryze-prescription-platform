import React from 'react';
import { Stethoscope, User, BadgeCheck, Building2, MapPin, Phone, Mail, Info } from 'lucide-react';
import { FormData } from '../../types/form';
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../ui/tooltip";
import { Link } from 'react-router-dom';

interface Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PractitionerSection({ formData, onChange }: Props) {
  const tooltipContent = (field: string) => (
    <div className="space-y-1">
      <p className="font-medium text-gray-900">{field} from your profile</p>
      <p className="text-gray-500">You can edit this in your <Link to="/admin/profile" className="text-purple-600 hover:text-purple-700 font-medium">dashboard settings</Link></p>
    </div>
  );

  return (
    <TooltipProvider>
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      name="doctorName"
                      placeholder="Doctor's Name"
                      value={formData.doctorName}
                      onChange={onChange}
                      className="pl-10 pr-10 cursor-not-allowed bg-muted"
                      required
                      readOnly
                    />
                    <Info className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {tooltipContent("Doctor's name")}
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="space-y-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <BadgeCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      name="licenseNumber"
                      placeholder="License Number"
                      value={formData.licenseNumber}
                      onChange={onChange}
                      className="pl-10 pr-10 cursor-not-allowed bg-muted"
                      required
                      readOnly
                    />
                    <Info className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {tooltipContent("License number")}
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="space-y-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={onChange}
                      className="pl-10 pr-10 cursor-not-allowed bg-muted"
                      required
                      readOnly
                    />
                    <Info className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {tooltipContent("Email address")}
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="space-y-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      name="clinicName"
                      placeholder="Clinic Name"
                      value={formData.clinicName}
                      onChange={onChange}
                      className="pl-10 pr-10 cursor-not-allowed bg-muted"
                      required
                      readOnly
                    />
                    <Info className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {tooltipContent("Clinic name")}
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      name="clinicAddress"
                      placeholder="Clinic Address"
                      value={formData.clinicAddress}
                      onChange={onChange}
                      className="pl-10 pr-10 cursor-not-allowed bg-muted"
                      required
                      readOnly
                    />
                    <Info className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {tooltipContent("Clinic address")}
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="space-y-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      name="clinicPhone"
                      placeholder="Clinic Phone"
                      value={formData.clinicPhone}
                      onChange={onChange}
                      className="pl-10 pr-10 cursor-not-allowed bg-muted"
                      required
                      readOnly
                    />
                    <Info className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {tooltipContent("Clinic phone")}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}