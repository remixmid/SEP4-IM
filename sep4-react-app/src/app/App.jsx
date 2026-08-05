import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../features/auth/context/AuthContextProvider.jsx";
import ProtectedRoute from "../features/auth/components/ProtectedRoute.jsx";
import LoginPage from "../features/auth/pages/LoginPage.jsx";
import RegistrationPage from "../features/auth/pages/RegistrationPage.jsx";
import DashboardPage from "../features/zones/pages/DashboardPage.jsx";

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/main" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
