import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { LoadingPage } from "../ui/loading";
import { ClipboardList, User, FileText, Plus, ArrowRight, Eye } from "lucide-react";
import { PrescriptionDetailsDialog } from './PrescriptionDetailsDialog';
import { useUserMetadata } from '../auth/UserMetadataContext';

interface DashboardStats {
  totalPrescriptions: number;
  recentPrescriptions: any[];
}

export function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalPrescriptions: 0,
    recentPrescriptions: [],
  });
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const { metadata } = useUserMetadata();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get total prescriptions
      const { count } = await supabase
        .from('prescriptions')
        .select('*', { count: 'exact', head: true })
        .eq('practitioner_id', user.id);

      // Get recent prescriptions
      const { data: recentPrescriptions } = await supabase
        .from('prescriptions')
        .select('*')
        .eq('practitioner_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        totalPrescriptions: count || 0,
        recentPrescriptions: recentPrescriptions || [],
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <Card className="border-0 bg-gradient-to-r from-purple-600 to-blue-600">
        <CardContent className="pt-6">
          <div className="text-white">
            <h1 className="text-2xl font-bold">Welcome back, {metadata.full_name}</h1>
            <p className="text-purple-100 mt-1">{metadata.clinic_name}</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-purple-600" />
              Total Prescriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPrescriptions}</div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2 h-auto py-4 px-4"
              onClick={() => navigate('/admin/prescriptions')}
            >
              <div className="flex flex-col items-start text-left">
                <span className="font-semibold">View Prescriptions</span>
                <span className="text-sm text-muted-foreground">Manage your prescriptions</span>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 h-auto py-4 px-4"
              onClick={() => navigate('/admin/profile')}
            >
              <div className="flex flex-col items-start text-left">
                <span className="font-semibold">Update Profile</span>
                <span className="text-sm text-muted-foreground">Manage your information</span>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-purple-600" />
              Recent Prescriptions
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => navigate('/admin/prescriptions')}
            >
              <Plus className="h-4 w-4" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {stats.recentPrescriptions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No prescriptions created yet.</p>
              <Button
                variant="link"
                className="mt-2 text-purple-600"
                onClick={() => navigate('/')}
              >
                Create your first prescription
              </Button>
            </div>
          ) :
            <div className="space-y-4">
              {stats.recentPrescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <div className="font-medium">{prescription.patient_name}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(prescription.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      {prescription.dosage}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:text-purple-700"
                      onClick={() => setSelectedPrescription(prescription)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          }
        </CardContent>
      </Card>

      <PrescriptionDetailsDialog
        prescription={selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
      />
    </div>
  );
} 