import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import LandingPage from './pages/LandingPage';
import { LanguageProvider } from './i18n/LanguageContext';
import './index.css';
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<App />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>
);
