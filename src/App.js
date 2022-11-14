import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Board from "./routes/Board";
import BoardForm from "./routes/BoardForm";

function App() {

  return (
        <Router>
            <Routes>
                <Route path="/"              element={<Board />} />
                <Route path="/boardForm"     element={<BoardForm />} />
                <Route path="/boardForm/:id" element={<BoardForm />} />
            </Routes>
        </Router>
    );
}

export default App;