import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Mail, Lock, User, Phone, Building2, BadgeCheck } from "lucide-react";

interface Props {
  onSuccess?: () => void;
}

export function SignUpForm({ onSuccess }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    doctorName: '',
    licenseNumber: '',
    clinicName: '',
    clinicAddress: '',
    clinicPhone: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) throw signUpError;

      const { error: profileError } = await supabase
        .from('practitioners')
        .insert([
          {
            user_id: (await supabase.auth.getUser()).data.user?.id,
            doctor_name: formData.doctorName,
            license_number: formData.licenseNumber,
            clinic_name: formData.clinicName,
            clinic_address: formData.clinicAddress,
            clinic_phone: formData.clinicPhone,
            email: formData.email,
          },
        ]);

      if (profileError) throw profileError;
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/admin/profile');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
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
                id="doctorName"
                name="doctorName"
                type="text"
                placeholder="Doctor's Full Name"
                value={formData.doctorName}
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
                id="licenseNumber"
                name="licenseNumber"
                type="text"
                placeholder="License Number"
                value={formData.licenseNumber}
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
                id="clinicName"
                name="clinicName"
                type="text"
                placeholder="Clinic Name"
                value={formData.clinicName}
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
                id="clinicAddress"
                name="clinicAddress"
                type="text"
                placeholder="Clinic Address"
                value={formData.clinicAddress}
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
                id="clinicPhone"
                name="clinicPhone"
                type="tel"
                placeholder="Clinic Phone"
                value={formData.clinicPhone}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
    </div>
  );
} 