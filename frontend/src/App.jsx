import { useEffect, useState } from "react";
import "./App.css";
import ImageUploader from "./components/ImageEditor/ImageUploader";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import Dashboard from "./dashboard/Dashboard";
import ImageGallery from "./components/ImageEditor/ImageGallery";
import ImageEditor from "./components/ImageEditor/ImageEditor";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { ToastContainer } from "react-toastify";
import { ImageProvider } from "./context/ImageContext";

function App() {
  return (
    <AuthProvider>
      <ImageProvider>
        <Router>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
            theme="light"
          />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<ProtectedLayout />}>
              <Route path="dashboard" element={<Dashboard />}>
                <Route index element={<ImageUploader />} />
                <Route path="upload" element={<ImageUploader />} />
                <Route path="gallery" element={<ImageGallery />} />
                <Route path="edit/:id" element={<ImageEditor />} />
              </Route>
            </Route>

            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </ImageProvider>
    </AuthProvider>
  );
}

export default App;
