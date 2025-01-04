import React from 'react';
import { Pill, Hash, RotateCcw, FileText } from 'lucide-react';
import { FormData } from '../../types/form';
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { readOnlyStyles } from '../../lib/readOnlyStyles';
import { FormFieldTooltip } from '../ui/form-field-tooltip';
import { TooltipProvider } from '../ui/tooltip';

interface Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  isReadOnly?: boolean;
}

export function PrescriptionSection({ formData, onChange, isReadOnly }: Props) {
  return (
    <TooltipProvider>
      <Card>
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-purple-600" />
            <CardTitle>Prescription Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormFieldTooltip
                title="Dosage"
                description="Select the prescribed dosage"
                isReadOnly={isReadOnly}
              >
                <div className="relative">
                  <Pill className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Select 
                    name="dosage" 
                    value={formData.dosage}
                    onValueChange={(value: string) => onChange({ target: { name: 'dosage', value } } as any)}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger className={`pl-10 ${isReadOnly ? readOnlyStyles.select : ''}`}>
                      <SelectValue placeholder="Select Dosage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.25mg">0.25mg</SelectItem>
                      <SelectItem value="0.5mg">0.5mg</SelectItem>
                      <SelectItem value="1.0mg">1.0mg</SelectItem>
                      <SelectItem value="1.7mg">1.7mg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </FormFieldTooltip>
            </div>
            <div className="space-y-2">
              <FormFieldTooltip
                title="Quantity"
                description="Enter the number of units prescribed"
                isReadOnly={isReadOnly}
              >
                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={onChange}
                    className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>
            </div>
            <div className="space-y-2">
              <FormFieldTooltip
                title="Refills"
                description="Select the number of refills allowed"
                isReadOnly={isReadOnly}
              >
                <div className="relative">
                  <RotateCcw className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Select 
                    name="refills" 
                    value={formData.refills}
                    onValueChange={(value: string) => onChange({ target: { name: 'refills', value } } as any)}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger className={`pl-10 ${isReadOnly ? readOnlyStyles.select : ''}`}>
                      <SelectValue placeholder="Select Refills" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </FormFieldTooltip>
            </div>
            <div className="space-y-2 md:col-span-2">
              <FormFieldTooltip
                title="Special Instructions"
                description="Enter any special instructions or notes"
                isReadOnly={isReadOnly}
              >
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    name="instructions"
                    placeholder="Special Instructions"
                    value={formData.instructions}
                    onChange={onChange}
                    className={`min-h-[100px] pl-10 ${isReadOnly ? readOnlyStyles.textarea : ''}`}
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}