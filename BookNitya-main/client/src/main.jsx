import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BooksPage from './pages/BooksPage.jsx';
import NewBookPage from './pages/NewBookPage.jsx';
import EditBookPage from './pages/EditBookPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/new" element={<NewBookPage />} />
        <Route path="/edit/:id" element={<EditBookPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
