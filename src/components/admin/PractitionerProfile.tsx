import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User, BadgeCheck, Building2, MapPin, Phone, Mail } from "lucide-react";
import { LoadingPage } from "../ui/loading";
import { Alert, AlertDescription } from "../ui/alert";

interface FormData {
  email: string;
  full_name: string;
  license_number: string;
  clinic_name: string;
  clinic_address: string;
  clinic_phone: string;
}

export function PractitionerProfile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    full_name: '',
    license_number: '',
    clinic_name: '',
    clinic_address: '',
    clinic_phone: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setError(null);
      // Check for initial profile data in localStorage
      const initialData = localStorage.getItem('initialProfileData');
      if (initialData) {
        const parsedData = JSON.parse(initialData);
        setFormData(parsedData);
        localStorage.removeItem('initialProfileData'); // Clear the data after using it
        return;
      }

      // If no initial data, fetch from Supabase
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (user) {
        setFormData({
          email: user.email || '',
          full_name: user.user_metadata.full_name || '',
          license_number: user.user_metadata.license_number || '',
          clinic_name: user.user_metadata.clinic_name || '',
          clinic_address: user.user_metadata.clinic_address || '',
          clinic_phone: user.user_metadata.clinic_phone || '',
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
      const { error } = await supabase.auth.updateUser({
        email: formData.email,
        data: {
          full_name: formData.full_name,
          license_number: formData.license_number,
          clinic_name: formData.clinic_name,
          clinic_address: formData.clinic_address,
          clinic_phone: formData.clinic_phone,
        }
      });

      if (error) throw error;
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
            <CardTitle>Practitioner Profile</CardTitle>
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
            </div>

            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <BadgeCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  name="license_number"
                  placeholder="License Number"
                  value={formData.license_number}
                  onChange={handleChange}
                  required
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
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  name="clinic_address"
                  placeholder="Clinic Address"
                  value={formData.clinic_address}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="tel"
                  name="clinic_phone"
                  placeholder="Clinic Phone"
                  value={formData.clinic_phone}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}