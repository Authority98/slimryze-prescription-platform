import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import { PractitionerProfile } from './components/admin/PractitionerProfile';
import { PrescriptionList } from './components/admin/PrescriptionList';
import { AdminLayout } from './components/admin/AdminLayout';
import { Dashboard } from './components/admin/Dashboard';
import PrescriptionForm from './components/PrescriptionForm';
import { PrivateRoute } from './components/auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrescriptionForm />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <Navigate to="/admin/dashboard" replace />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <PractitionerProfile />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/prescriptions"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <PrescriptionList />
                </AdminLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;