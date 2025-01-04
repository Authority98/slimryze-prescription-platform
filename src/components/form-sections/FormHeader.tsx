import React from 'react';
import { Lock } from 'lucide-react';
import { Card, CardContent } from "../ui/card";

export function FormHeader() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-center">
          <div className="flex items-center justify-center h-8 w-auto px-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium shadow-lg">
            SlimRyze Prescription Form
          </div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span className="text-sm">HIPAA-Compliant Secure Form</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}