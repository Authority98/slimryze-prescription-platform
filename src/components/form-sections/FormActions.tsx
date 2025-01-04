import React from 'react';
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface Props {
  onReset: () => void;
}

export function FormActions({ onReset }: Props) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            onClick={onReset}
            variant="outline"
          >
            Clear Form
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            Submit Prescription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}