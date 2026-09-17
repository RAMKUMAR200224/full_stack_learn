import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<h1 className="p-4">Home</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}