import { useState } from 'react';
import { LoginForm } from './LoginForm';
import SignUpForm from './SignUpForm';
import { Switch } from "../../components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Lock } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] w-[200%] aspect-square bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-3 rounded-2xl shadow-xl">
            <Lock className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur">
          <CardHeader className="space-y-1 pb-8">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SlimRyze Platform
            </CardTitle>
            <CardDescription className="text-center text-base">
              Manage prescriptions securely and efficiently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Label 
                htmlFor="auth-mode" 
                className={`text-base cursor-pointer transition-colors ${!isLogin ? 'text-muted-foreground' : 'text-primary font-medium'}`}
              >
                Login
              </Label>
              <Switch
                id="auth-mode"
                checked={!isLogin}
                onCheckedChange={(checked) => setIsLogin(!checked)}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              />
              <Label 
                htmlFor="auth-mode" 
                className={`text-base cursor-pointer transition-colors ${isLogin ? 'text-muted-foreground' : 'text-primary font-medium'}`}
              >
                Sign Up
              </Label>
            </div>
            <div className="transition-all duration-300 ease-in-out">
              {isLogin ? <LoginForm /> : <SignUpForm />}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 