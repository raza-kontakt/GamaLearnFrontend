import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login/Login';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Assessments from '../pages/Assessments/Assessments';
import TrackSubmission from '../pages/TrackSubmission/TrackSubmission';
import RouteErrorBoundary from '../components/common/RouteErrorBoundary';

function AppRoutes() {
  return (
    <RouteErrorBoundary>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/" element={<DashboardLayout />}>
          <Route 
            path="/assessments" 
            element={
              <RouteErrorBoundary>
                <Assessments />
              </RouteErrorBoundary>
            } 
          />
          <Route 
            path="/track-submission/:id" 
            element={
              <RouteErrorBoundary>
                <TrackSubmission />
              </RouteErrorBoundary>
            } 
          />
        </Route>
      </Routes>
    </RouteErrorBoundary>
  );
}

export default AppRoutes;
