import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import LocalUpdates from './pages/LocalUpdates/LocalUpdates';
import Complaints from './pages/Complaints/Complaints';
import Enquiries from './pages/Enquiries/Enquiries';
import Community from './pages/Community/Community';
import TrackComplaint from './pages/TrackComplaint/TrackComplaint';
import NotFound from './pages/NotFound/NotFound';

import Login from './auth/Login/Login';
import Register from './auth/Register/Register';
import Dashboard from './auth/Dashboard/Dashboard';

/* Reset scroll position on every route change. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Navbar />

      <main className="app-main" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/local-updates" element={<LocalUpdates />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/enquiries" element={<Enquiries />} />
          <Route path="/community" element={<Community />} />
          <Route path="/track" element={<TrackComplaint />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
