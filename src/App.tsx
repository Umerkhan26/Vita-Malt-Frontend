import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={4500} newestOnTop theme="colored" style={{ zIndex: 9999 }} />
    </Router>
  );
}

export default App;
