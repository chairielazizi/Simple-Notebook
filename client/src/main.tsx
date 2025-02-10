import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";

import BookList from "./components/BookList.tsx";
import BookDetails from "./components/BookDetails.tsx";
import Header from "./components/Header.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header></Header>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/:bookId" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
