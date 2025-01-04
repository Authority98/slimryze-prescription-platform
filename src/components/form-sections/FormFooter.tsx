import React from 'react';
import { Lock } from 'lucide-react';
import { Card, CardContent } from "../ui/card";

export function FormFooter() {
  return (
    <Card>
      <CardContent className="pt-6">
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