import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import LogisticsDashboard from './components/LogisticDashboard';
import EnquiryForm from './components/EnquiryForm';
import LogisticsEnquiryForm from './pages/LogisticsEnquiryForm.jsx';
import { ManagerProvider } from './contextAPIs/ManagerContext.jsx';

export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/enquiry_form" element={<EnquiryForm />} />
        <Route path="/logistics_dashboard" element={<LogisticsDashboard />} />
        <Route path="/logistics_enquiry_form" element={
          <ManagerProvider>
            <LogisticsEnquiryForm />
        </ManagerProvider>          } />
     </Routes>
    </Router>
    </>
  );
}

