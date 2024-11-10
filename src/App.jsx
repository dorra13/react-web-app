// App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router and Routes

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";

function App() {
  return (
    <Router>
      {" "}
      {/* Router is wrapped only here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
