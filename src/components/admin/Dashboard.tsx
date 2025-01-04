import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { LoadingPage } from "../ui/loading";
import { ClipboardList, User, FileText, Plus, ArrowRight } from "lucide-react";

interface DashboardStats {
  totalPrescriptions: number;
  recentPrescriptions: any[];
  userData: {
    full_name: string;
    clinic_name: string;
  } | null;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalPrescriptions: 0,
    recentPrescriptions: [],
    userData: null,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Fetch user data
      const userData = {
        full_name: user.user_metadata.full_name || '',
        clinic_name: user.user_metadata.clinic_name || '',
      };

      // TODO: Fetch actual prescription data when available
      const totalPrescriptions = 0;
      const recentPrescriptions = [];

      setStats({
        totalPrescriptions,
        recentPrescriptions,
        userData,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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
            <h1 className="text-2xl font-bold">Welcome back, {stats.userData?.full_name}</h1>
            <p className="text-purple-100 mt-1">{stats.userData?.clinic_name}</p>
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
              New Prescription
            </Button>
          </div>
          <CardDescription>Your recently created prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentPrescriptions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No prescriptions created yet.</p>
              <Button
                variant="link"
                className="mt-2 text-purple-600"
                onClick={() => navigate('/admin/prescriptions')}
              >
                Create your first prescription
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* TODO: Add prescription list when available */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 