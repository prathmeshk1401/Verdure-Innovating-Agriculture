import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './pages/Hero';
import About from './pages/About';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Terms from "./pages/auth/Terms";
import PrivacyPolicy from "./pages/auth/PrivacyPolicy";
import DiseaseDetect from './services/DiseaseDetect';
import CropCareReport from './services/cropCareReport';
import HarvestHintsMain from './services/harvestHintsMain';
import HarvestHintsNext from './services/harvestHintsNext';
import NewCropHarvest from './services/newCropHarvest';
import FarmWisdom from './services/farmWisdom';
import AgriMarket from './services/agriMarket';
import FarmerForum from './services/farmerForum';
import CropTrade from './services/cropTrade';
import AgroWeather from './services/agroWeather';
import './assets/styles/App.css';
import ServicesFooter from './components/servicesFooter';

function MainSections() {
  return (
    <>
      {/* <Navbar /> */}
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainSections />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route
          path="/disease-detect"
          element={
            <>
              <DiseaseDetect />
              <ServicesFooter />
            </>
          }
        />
        <Route
          path="/cropCareReport"
          element={
            <>
              <CropCareReport />
              <ServicesFooter />
            </>
          }
        />
        <Route
          path="/harvestHintsMain"
          element={
            <>
              <HarvestHintsMain />
              <ServicesFooter />
            </>
          }
        />
        <Route
          path="/harvest-hints/:crop"
          element={
            <>
              <HarvestHintsNext />
              {/* <ServicesFooter /> */}
            </>
          }
        />
        <Route
          path="/newCropHarvest"
          element={
            <>
              <NewCropHarvest />
              <ServicesFooter />
            </>
          }
        />
        <Route
          path="/farmWisdom"
          element={
            <>
              <FarmWisdom />
              <ServicesFooter />
            </>
          }
        />
        <Route
          path="/agriMarket"
          element={
            <>
              <AgriMarket />
              <ServicesFooter />
            </>
          }
        />
        <Route
          path="/farmerForum"
          element={
            <>
              <FarmerForum />
              <ServicesFooter />
            </>
          }
        />
        <Route
          path="/cropTrade"
          element={
            <>
              <CropTrade />
              <ServicesFooter />
            </>
          }
        />
        <Route
          path="/agroWeather"
          element={
            <>
              <AgroWeather />
              <ServicesFooter />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;