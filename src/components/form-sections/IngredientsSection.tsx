import React from 'react';
import { Beaker } from 'lucide-react';
import { FormData } from '../../types/form';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TooltipProvider } from "../ui/tooltip";

interface Props {
  formData: FormData;
  isReadOnly?: boolean;
}

export function IngredientsSection({ formData, isReadOnly }: Props) {
  return (
    <TooltipProvider>
      <Card>
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-2">
            <Beaker className="w-5 h-5 text-purple-600" />
            <CardTitle>Prescription Ingredients</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative bg-white rounded-lg border border-input shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left font-medium text-muted-foreground p-4 pl-6 w-[25%]">Ingredient</th>
                  <th className="text-left font-medium text-muted-foreground p-4 w-[15%]">Dosage</th>
                  <th className="text-left font-medium text-muted-foreground p-4 pr-6">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-gray-50/50">
                  <td className="p-4 pl-6">Topiramate</td>
                  <td className="p-4">15mg</td>
                  <td className="p-4 pr-6">Appetite suppression and other metabolic pathways</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-4 pl-6">Caffeine</td>
                  <td className="p-4">20mg</td>
                  <td className="p-4 pr-6">Promotes lipolysis and thermogenesis</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-4 pl-6">Bupropion</td>
                  <td className="p-4">30mg</td>
                  <td className="p-4 pr-6">Moderates side effects of weight loss</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-4 pl-6">Naltrexone</td>
                  <td className="p-4">3mg</td>
                  <td className="p-4 pr-6">Moderates appetite and cravings</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-4 pl-6">Phentermine</td>
                  <td className="p-4">12.5mg</td>
                  <td className="p-4 pr-6">Reduces appetite and food consumption</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-4 pl-6">Metformin</td>
                  <td className="p-4">250mg</td>
                  <td className="p-4 pr-6">Reduces insulin resistance preventing the conversion of carbohydrates into fat</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-4 pl-6">Methycobalamin</td>
                  <td className="p-4">500mg</td>
                  <td className="p-4 pr-6">Boosts metabolism and energy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
} 