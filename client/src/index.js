import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app.jsx';

const root = createRoot(document.getElementById("index"));
root.render(<App />);
