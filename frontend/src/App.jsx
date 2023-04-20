// Import necessary modules and packages
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoutes from "./utilities/privateRoutes";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Logout from "./pages/logout/logout";
import Home from "./pages/home/home";

// Main component that renders the application
function App() {
  return (
    <Router>
      <Routes>
        {/* Private routes require authentication */}
        <Route element={<PrivateRoutes />}>
          {/* Home page is the landing page */}
          <Route element={<Home />} path="/" exact />
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
