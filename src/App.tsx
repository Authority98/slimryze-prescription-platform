import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import AuthPage from './components/auth/AuthPage';
import { PractitionerProfile } from './components/admin/PractitionerProfile';
import { PrescriptionList } from './components/admin/PrescriptionList';
import { AdminLayout } from './components/admin/AdminLayout';
import PrescriptionForm from './components/PrescriptionForm';
import { PrivateRoute } from './components/auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrescriptionForm />} />
          <Route path="/admin/login" element={<AuthPage />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <Navigate to="/admin/profile" replace />
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