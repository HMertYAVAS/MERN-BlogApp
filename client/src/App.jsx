import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects"
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./components/Header/Header";

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={ <Dashboard /> } />
        <Route path="/projects" element={ <Projects /> } />
        <Route path="/sign-in" element={ <SignIn /> } />
        <Route path="/Sign-up" element={ <SignUp /> } />


      </Routes>
    </BrowserRouter>
  );
}
