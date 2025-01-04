import React from 'react';
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface Props {
  onReset: () => void;
  isReadOnly?: boolean;
}

export function FormActions({ onReset, isReadOnly }: Props) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            onClick={onReset}
            variant="outline"
            disabled={isReadOnly}
          >
            Clear Form
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            disabled={isReadOnly}
          >
            Submit Prescription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}