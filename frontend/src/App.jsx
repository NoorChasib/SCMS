// Import necessary modules and packages
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoutes from "./utils/privateRoutes";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Logout from "./pages/LogoutPage/Logout";
import Home from "./pages/HomePage/Home";
import Camera from "./pages/CameraPage/Camera";

// Main component that renders the application
function App() {
  return (
    <Router>
      <Routes>
        {/* Private routes require authentication */}
        <Route element={<PrivateRoutes />}>
          {/* Home page is the landing page */}
          <Route element={<Home />} path="/" exact />
          {/* Camera page */}
          <Route element={<Camera />} path="/camera/:id" />
        </Route>
        {/* Login page */}
        <Route element={<Login />} path="/login" />
        {/* Registration page */}
        <Route element={<Register />} path="/register" />
        {/* Logout page */}
        <Route element={<Logout />} path="/logout" />
        {/* If none of the above routes are matched, redirect to home page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
