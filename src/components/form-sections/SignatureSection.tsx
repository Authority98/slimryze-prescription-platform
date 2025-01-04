import React from 'react';
import { FileSignature } from 'lucide-react';
import { FormData } from '../../types/form';
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SignatureSection({ formData, onChange }: Props) {
  return (
    <Card>
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center gap-2">
          <FileSignature className="w-5 h-5 text-purple-600" />
          <CardTitle>Electronic Signature</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="relative">
            <FileSignature className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              name="signature"
              value={formData.signature}
              onChange={onChange}
              placeholder="Type your full name to sign"
              className="pl-10"
              required
            />
          </div>
          <p className="text-sm text-muted-foreground">
            By typing your name above, you are signing this prescription electronically.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}