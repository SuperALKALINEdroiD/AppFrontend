// import './App.css';
import Signup from './components/Signup/Signup.jsx'
import TopBar from './components/TopBar.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test" element={<TopBar />}/>
        {/* <Route path ="*" element= {<NoMatch />}/>  */}
      </Routes>
    </BrowserRouter>
  );
}