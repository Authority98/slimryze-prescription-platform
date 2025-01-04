import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Mail, Lock, User, BadgeCheck, Building2, MapPin, Phone } from "lucide-react";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
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
    setError(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            license_number: formData.licenseNumber,
            clinic_name: formData.clinicName,
            clinic_address: formData.clinicAddress,
            clinic_phone: formData.clinicPhone,
          },
        },
      });

      if (signUpError) throw signUpError;
      
      if (data) {
        // Store form data in localStorage for pre-filling the profile
        localStorage.setItem('initialProfileData', JSON.stringify({
          email: formData.email,
          full_name: formData.fullName,
          license_number: formData.licenseNumber,
          clinic_name: formData.clinicName,
          clinic_address: formData.clinicAddress,
          clinic_phone: formData.clinicPhone,
        }));
        
        // Sign in the user immediately after signup
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) throw signInError;
        
        navigate('/admin/profile');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
              <AlertDescription className="text-red-600">{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
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
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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

          <div className="pt-4 border-t">
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

            <div className="space-y-2 mt-4">
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
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </Button>
      </form>
    </div>
  );
} 