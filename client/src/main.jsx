import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";

import './index.css'
import App from './App.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({ duration: 1000, once: true });


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
