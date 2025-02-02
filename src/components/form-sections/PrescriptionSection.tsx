import React from 'react';
import { Pill, Hash, RotateCcw, FileText } from 'lucide-react';
import { FormData } from '../../types/form';
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
  const quantityOptions = ["10", "30", "60", "90"];
  const [isOpen, setIsOpen] = React.useState(false);

  const handleQuantitySelect = (currentValue: string) => {
    const event = {
      target: {
        name: 'quantity',
        value: currentValue,
        type: 'number'
      }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
    setIsOpen(false);
  };

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
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <FormFieldTooltip
                title="Dosage"
                description="Enter or select the prescribed dosage"
                isReadOnly={isReadOnly}
              >
                <div className="relative w-full">
                  <Pill className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="dosage"
                    placeholder="Enter dosage"
                    value={formData.dosage}
                    onChange={onChange}
                    className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="Quantity"
                description="Enter or select the number of units prescribed"
                isReadOnly={isReadOnly}
              >
                <div className="relative w-full">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    name="quantity"
                    placeholder="Enter quantity"
                    value={formData.quantity}
                    onChange={onChange}
                    className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                    required
                    readOnly={isReadOnly}
                    min="1"
                  />
                </div>
              </FormFieldTooltip>

              <FormFieldTooltip
                title="Refills"
                description="Enter the number of refills allowed"
                isReadOnly={isReadOnly}
              >
                <div className="relative w-full">
                  <RotateCcw className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    name="refills"
                    placeholder="Enter refills"
                    value={formData.refills}
                    onChange={onChange}
                    className={`pl-10 ${isReadOnly ? readOnlyStyles.input : ''}`}
                    required
                    readOnly={isReadOnly}
                    min="0"
                  />
                </div>
              </FormFieldTooltip>
            </div>

            <div className="space-y-2">
              <FormFieldTooltip
                title="Directions"
                description="Enter any specific directions for the patient"
                isReadOnly={isReadOnly}
              >
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    name="instructions"
                    placeholder="Take ONE to TWO capsules by mouth at 9:00 AM as directed by your prescriber. It is advisable to take a multivitamin supplement once a day."
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