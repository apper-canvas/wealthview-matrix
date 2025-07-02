import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import Dashboard from '@/components/pages/Dashboard';
import Holdings from '@/components/pages/Holdings';
import Performance from '@/components/pages/Performance';
import Transactions from '@/components/pages/Transactions';

// Temporary placeholder components until actual pages are created
const NotificationsPlaceholder = () => {
  React.useEffect(() => {
    toast.info('Notifications page is being developed. Full functionality coming soon!');
  }, []);
  
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <p className="text-gray-600">Notification management system will be available here.</p>
    </div>
  );
};

const SettingsPlaceholder = () => {
  React.useEffect(() => {
    toast.info('Settings page is being developed. Full functionality coming soon!');
  }, []);
  
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p className="text-gray-600">Portfolio and notification settings will be available here.</p>
    </div>
  );
};
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-secondary-50">
        <Layout>
<Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/notifications" element={<NotificationsPlaceholder />} />
            <Route path="/settings" element={<SettingsPlaceholder />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;