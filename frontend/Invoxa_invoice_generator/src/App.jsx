import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Signup from "./Pages/Auth/Signup";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AllInvoices from "./Pages/Invoices/AllInvoices";
import CreateInvoice from "./Pages/Invoices/CreateInvoice";
import ProfilePage from "./Pages/Profile/ProfilePage";
import ProtectedRoute from "./Pages/Auth/ProtectedRoute";
import { AuthProvider } from "./Context/AuthContext";




const App = () => {
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path = "/" element={<LandingPage />} />
          <Route path = "/Signup" element={<Signup />} />
          <Route path = "/Login" element={<Login />} />
          
          {/* {Protected Routes} */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="Dashboard" element="{<Dashboard />}" />
            <Route path="Invoices" element="{<AllInvoices />}" />
            <Route path="Invoices/new" element="{<CreateInvoice />}" />
            <Route path="Invoices/: id" element="{<InvoiceDetail />}" />
            <Route path="Profile" element="{<ProfilePage />}" />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <Toaster 
        toastOptions={{
          className:"",
          style:{
            fontSize:"13px",
          },
        }} />
    </AuthProvider>
  )
}

export default App
