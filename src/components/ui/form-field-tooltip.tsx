import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { readOnlyStyles } from '../../lib/readOnlyStyles';

interface FormFieldTooltipProps {
  title: string;
  description: string | React.ReactNode;
  isReadOnly?: boolean;
  customReadOnlyMessage?: string | React.ReactNode;
  children: React.ReactNode;
}

export function FormFieldTooltip({ 
  title, 
  description, 
  isReadOnly, 
  customReadOnlyMessage,
  children 
}: FormFieldTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-1">
          <p className={readOnlyStyles.tooltip.title}>{title}</p>
          <div className={readOnlyStyles.tooltip.description}>
            {isReadOnly ? (customReadOnlyMessage || 'Please sign in to edit this field.') : description}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
} 