import React from 'react';
import { FileSignature } from 'lucide-react';
import { FormData } from '../../types/form';
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { readOnlyStyles } from '../../lib/readOnlyStyles';
import { FormFieldTooltip } from '../ui/form-field-tooltip';
import { TooltipProvider } from '../ui/tooltip';

interface Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
}

export function SignatureSection({ formData, onChange, isReadOnly }: Props) {
  return (
    <TooltipProvider>
      <Card>
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-2">
            <FileSignature className="w-5 h-5 text-purple-600" />
            <CardTitle>Electronic Signature</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <FormFieldTooltip
              title="Electronic Signature"
              description="Type your full name to sign this prescription electronically"
              isReadOnly={isReadOnly}
            >
              <div className="relative">
                <FileSignature className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  name="signature"
                  value={formData.signature}
                  onChange={onChange}
                  placeholder="Type your full name to sign"
                  className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </FormFieldTooltip>
            <p className={`text-sm ${isReadOnly ? readOnlyStyles.tooltip.description : 'text-muted-foreground'}`}>
              {isReadOnly 
                ? "Please sign in to add your electronic signature."
                : "By typing your name above, you are signing this prescription electronically."}
            </p>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}