import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import InstantWin from "../pages/InstantWin/InstantWin";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Winners from "../pages/Winners/Winners";
import Social from "../pages/Social/Social";
import Faq from "../pages/Faq/Faq";
import Terms from "../pages/Terms/Terms";
import Privacy from "../pages/Privacy/Privacy";
import Contact from "../pages/Contact/Contact";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import EntrantDetail from "../pages/Admin/EntrantDetail";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/instant-win" element={<InstantWin />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/winners" element={<Winners />} />
    <Route path="/social" element={<Social />} />
    <Route path="/faq" element={<Faq />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/entrants/:entrantId" element={<EntrantDetail />} />
  </Routes>
);

export default AppRoutes;
