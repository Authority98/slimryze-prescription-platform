import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User, Hash, Building2, MapPin, Phone, Mail, FileText, Printer } from "lucide-react";
import { LoadingPage } from "../ui/loading";
import { useUserMetadata } from '../auth/UserMetadataContext';
import { FormFieldTooltip } from '../ui/form-field-tooltip';
import { TooltipProvider } from '../ui/tooltip';
import { useToast } from "../ui/use-toast";

interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  npi_number: string;
  dea_number: string;
  clinic_name: string;
  clinic_street_address: string;
  clinic_city: string;
  clinic_state: string;
  clinic_postal_code: string;
  clinic_country: string;
  clinic_phone: string;
  clinic_fax: string;
}

export function PractitionerProfile() {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { updateMetadata } = useUserMetadata();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    first_name: '',
    last_name: '',
    npi_number: '',
    dea_number: '',
    clinic_name: '',
    clinic_street_address: '',
    clinic_city: '',
    clinic_state: '',
    clinic_postal_code: '',
    clinic_country: 'US',
    clinic_phone: '',
    clinic_fax: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {

      const initialData = localStorage.getItem('initialProfileData');
      if (initialData) {
        const parsedData = JSON.parse(initialData);
        setFormData(parsedData);
        localStorage.removeItem('initialProfileData');
        return;
      }

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (user) {
        const fullName = user.user_metadata.full_name || '';
        const [firstName = '', lastName = ''] = fullName.split(' ');
        
        setFormData({
          email: user.email || '',
          first_name: firstName,
          last_name: lastName,
          npi_number: user.user_metadata.npi_number || '',
          dea_number: user.user_metadata.dea_number || '',
          clinic_name: user.user_metadata.clinic_name || '',
          clinic_street_address: user.user_metadata.clinic_street_address || '',
          clinic_city: user.user_metadata.clinic_city || '',
          clinic_state: user.user_metadata.clinic_state || '',
          clinic_postal_code: user.user_metadata.clinic_postal_code || '',
          clinic_country: user.user_metadata.clinic_country || 'US',
          clinic_phone: user.user_metadata.clinic_phone || '',
          clinic_fax: user.user_metadata.clinic_fax || '',
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : 'Error fetching profile'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);


    try {
      await updateMetadata({
        full_name: `${formData.first_name} ${formData.last_name}`,
        npi_number: formData.npi_number,
        dea_number: formData.dea_number,
        clinic_name: formData.clinic_name,
        clinic_street_address: formData.clinic_street_address,
        clinic_city: formData.clinic_city,
        clinic_state: formData.clinic_state,
        clinic_postal_code: formData.clinic_postal_code,
        clinic_country: formData.clinic_country,
        clinic_phone: formData.clinic_phone,
        clinic_fax: formData.clinic_fax,
      });

      toast({
        title: "Success",
        description: "Profile updated successfully!"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : 'Error updating profile'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (loading && !formData.email) {
    return <LoadingPage />;
  }

  return (
    <TooltipProvider>
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              <CardTitle>Edit Practitioner Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormFieldTooltip
                    title="Email"
                    description="Your registered email address"
                  >
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="pl-10"
                      />
                    </div>
                  </FormFieldTooltip>

                  <FormFieldTooltip
                    title="Clinic Name"
                    description="Your clinic's name"
                  >
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        name="clinic_name"
                        placeholder="Clinic Name"
                        value={formData.clinic_name}
                        onChange={handleChange}
                        required
                        className="pl-10"
                      />
                    </div>
                  </FormFieldTooltip>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormFieldTooltip
                    title="NPI Number"
                    description="Your National Provider Identifier number"
                  >
                    <div className="relative">
                      <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        name="npi_number"
                        placeholder="NPI Number"
                        value={formData.npi_number}
                        onChange={handleChange}
                        required
                        className="pl-10"
                      />
                    </div>
                  </FormFieldTooltip>

                  <FormFieldTooltip
                    title="DEA Number"
                    description="Your Drug Enforcement Administration number"
                  >
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        name="dea_number"
                        placeholder="DEA Number"
                        value={formData.dea_number}
                        onChange={handleChange}
                        required
                        className="pl-10"
                      />
                    </div>
                  </FormFieldTooltip>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormFieldTooltip
                    title="Phone Number"
                    description="Your clinic's phone number"
                  >
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        name="clinic_phone"
                        placeholder="Clinic Phone"
                        value={formData.clinic_phone}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </FormFieldTooltip>

                  <FormFieldTooltip
                    title="Fax Number"
                    description="Your clinic's fax number"
                  >
                    <div className="relative">
                      <Printer className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        name="clinic_fax"
                        placeholder="Clinic Fax"
                        value={formData.clinic_fax}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </FormFieldTooltip>
                </div>

                <FormFieldTooltip
                  title="Street Address"
                  description="Your clinic's street address"
                >
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      name="clinic_street_address"
                      placeholder="Street Address"
                      value={formData.clinic_street_address}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </FormFieldTooltip>

                  <div className="grid grid-cols-4 gap-2">
                    <FormFieldTooltip
                      title="City"
                      description="Your clinic's city"
                    >
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          name="clinic_city"
                          placeholder="City"
                          value={formData.clinic_city}
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </FormFieldTooltip>

                    <FormFieldTooltip
                      title="State"
                      description="Your clinic's state"
                    >
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          name="clinic_state"
                          placeholder="State"
                          value={formData.clinic_state}
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </FormFieldTooltip>

                    <FormFieldTooltip
                      title="Postal Code"
                      description="Your clinic's postal code"
                    >
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          name="clinic_postal_code"
                          placeholder="Postal Code"
                          value={formData.clinic_postal_code}
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </FormFieldTooltip>

                    <FormFieldTooltip
                      title="Country"
                      description="Your clinic's country"
                    >
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          name="clinic_country"
                          placeholder="Country"
                          value={formData.clinic_country}
                          onChange={handleChange}
                          className="pl-10"
                          defaultValue="US"
                        />
                      </div>
                    </FormFieldTooltip>
                  </div>


                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </Button>
              </form>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}