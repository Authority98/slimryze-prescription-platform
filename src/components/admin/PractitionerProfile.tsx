import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User, Hash, Building2, MapPin, Phone, Mail, FileText, Printer } from "lucide-react";
import { LoadingPage } from "../ui/loading";
import { Alert, AlertDescription } from "../ui/alert";
import { useUserMetadata } from '../auth/UserMetadataContext';

interface FormData {
  email: string;
  full_name: string;
  npi_number: string;
  dea_number: string;
  clinic_name: string;
  clinic_address: string;
  clinic_phone: string;
  clinic_fax: string;
}

export function PractitionerProfile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { metadata, updateMetadata } = useUserMetadata();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    full_name: '',
    npi_number: '',
    dea_number: '',
    clinic_name: '',
    clinic_address: '',
    clinic_phone: '',
    clinic_fax: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setError(null);
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
        setFormData({
          email: user.email || '',
          full_name: user.user_metadata.full_name || '',
          npi_number: user.user_metadata.npi_number || '',
          dea_number: user.user_metadata.dea_number || '',
          clinic_name: user.user_metadata.clinic_name || '',
          clinic_address: user.user_metadata.clinic_address || '',
          clinic_phone: user.user_metadata.clinic_phone || '',
          clinic_fax: user.user_metadata.clinic_fax || '',
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error fetching profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updateMetadata({
        full_name: formData.full_name,
        npi_number: formData.npi_number,
        dea_number: formData.dea_number,
        clinic_name: formData.clinic_name,
        clinic_address: formData.clinic_address,
        clinic_phone: formData.clinic_phone,
        clinic_fax: formData.clinic_fax,
      });

      setSuccess('Profile updated successfully!');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error updating profile');
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
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            <CardTitle>Edit Practitioner Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6 border-red-500/50 bg-red-500/10">
              <AlertDescription className="text-red-600">{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-6 border-green-500/50 bg-green-500/10">
              <AlertDescription className="text-green-600">{success}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
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

                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="full_name"
                    placeholder="Doctor Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="npi_number"
                    placeholder="NPI Number"
                    value={formData.npi_number}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="dea_number"
                    placeholder="DEA Number"
                    value={formData.dea_number}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="clinic_name"
                    placeholder="Clinic Name"
                    value={formData.clinic_name}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="clinic_address"
                    placeholder="Clinic Address"
                    value={formData.clinic_address}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>

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
  );
}