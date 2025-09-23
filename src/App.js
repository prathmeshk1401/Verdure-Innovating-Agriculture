import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Hero from './pages/Hero';
import About from './pages/About';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';

// Auth
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Logout from './components/Logout/Logout';

// Dashboard pages
import Dashboard from './pages/Dashboard/Dashboard';
import CropManagement from './pages/CropManage/cropManage';
import Analytics from "./pages/Analytics/Analytics";
import Schedules from './pages/Schedules/Schedules';
import MyPlan from './pages/Payments/MyPlan';
import UpgradePlan from './pages/Payments/UpgradePlan';
import Weather from './pages/Weather/Weather';
import GlobalCrops from './pages/GlobalCrops/GlobalCrops';
import SoilTools from './pages/SoilTesting/SoilTesting';
import Tools from './pages/Tools & Calculators/Tools';
import Forum from './pages/Forum/Forum';
import Messages from './pages/Forum/Messages';
import Notifications from './pages/notifications/Notifications';
import Settings from './pages/Settings/Settings';
import News from './pages/news&updates/News';
import ExportCrops from './pages/Export/ExportCrops';

// Services
import DiseaseDetect from './services/DiseaseDetect';
import CropCareReport from './services/cropCareReport';
import HarvestHintsMain from './services/harvestHintsMain';
import HarvestHintsNext from './services/harvestHintsNext';
import NewCropHarvest from './services/newCropHarvest';
import FarmWisdom from './services/farmWisdom';
import AgriMarket from './services/agriMarket';
import FarmerForum from './services/farmerForum';
import CropTrade from './services/cropTrade';
import AgroWeatherService from './services/agroWeather';
import ServicesFooter from './components/servicesFooter';

import './assets/styles/App.css';

function MainSections() {
  return (
    <>
      <Navbar />
      <div id="home"><Hero /></div>
      <div id="about"><About /></div>
      <div id="services"><Services /></div>
      <div id="testimonials"><Testimonials /></div>
      <div id="contact"><Contact /></div>
      <Footer />
    </>
  );
}

function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="dashboard-content">{children}</div>
    </>
  );
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainSections />} />
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/signup" element={<><Navbar /><Signup /></>} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout><Dashboard /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/Crop-Management" element={
          <ProtectedRoute>
            <DashboardLayout><CropManagement /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/Analytics" element={
          <ProtectedRoute>
            <DashboardLayout><Analytics /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/Schedules" element={
          <ProtectedRoute>
            <DashboardLayout><Schedules /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/Payments" element={
          <ProtectedRoute>
            <DashboardLayout><MyPlan /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/UpgradePlan" element={
          <ProtectedRoute>
            <DashboardLayout><UpgradePlan /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/Weather" element={
          <ProtectedRoute>
            <DashboardLayout><Weather /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/GlobalCrops" element={
          <ProtectedRoute>
            <DashboardLayout><GlobalCrops /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/SoilTesting" element={
          <ProtectedRoute>
            <DashboardLayout><SoilTools /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/Tools" element={
          <ProtectedRoute>
            <DashboardLayout><Tools /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/Forum" element={
          <ProtectedRoute>
            <DashboardLayout><Forum /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/News" element={
          <ProtectedRoute>
            <DashboardLayout><News /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/ExportCrops" element={
          <ProtectedRoute>
            <DashboardLayout><ExportCrops /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/Messages" element={
          <ProtectedRoute>
            <DashboardLayout><Messages /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/Notifications" element={
          <ProtectedRoute>
            <DashboardLayout><Notifications /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/Settings" element={
          <ProtectedRoute>
            <DashboardLayout><Settings /></DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Services Routes */}
        <Route path="/disease-detect" element={<><Navbar /><DiseaseDetect /><ServicesFooter /></>} />
        <Route path="/cropCareReport" element={<><Navbar /><CropCareReport /><ServicesFooter /></>} />
        <Route path="/harvestHintsMain" element={<><Navbar /><HarvestHintsMain /><ServicesFooter /></>} />
        <Route path="/harvest-hints/:crop" element={<><Navbar /><HarvestHintsNext /><ServicesFooter /></>} />
        <Route path="/newCropHarvest" element={<><Navbar /><NewCropHarvest /><ServicesFooter /></>} />
        <Route path="/farmWisdom" element={<><Navbar /><FarmWisdom /><ServicesFooter /></>} />
        <Route path="/agriMarket" element={<><Navbar /><AgriMarket /><ServicesFooter /></>} />
        <Route path="/farmerForum" element={<><Navbar /><FarmerForum /><ServicesFooter /></>} />
        <Route path="/cropTrade" element={<><Navbar /><CropTrade /><ServicesFooter /></>} />
        <Route path="/agroWeather" element={<><Navbar /><AgroWeatherService /><ServicesFooter /></>} />

        {/* Catch-all */}
        <Route path="*" element={<MainSections />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
