// App.jsx

import { Routes, Route } from "react-router-dom"; // Import Router and Routes

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPostPage from "./pages/EditPostPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit-post/:id" element={<EditPostPage />} />
      </Routes>
  );
}

export default App;
