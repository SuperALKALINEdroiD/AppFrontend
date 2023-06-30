// import './App.css';
import Signup from './components/Signup/Signup.jsx'
import TopBar from './components/TopBar.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import RedditComponent from './components/RedditContent.jsx';
import Chat from './components/Chat.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test" element={<RedditComponent />} />
        <Route path="/home" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        {/* <Route path ="*" element= {<NoMatch />}/>  */}
      </Routes>
    </BrowserRouter>
  );
}