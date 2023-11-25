import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";

import { Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
