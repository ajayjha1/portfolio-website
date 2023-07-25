import logo from './logo.svg';
import './App.css';
import  { Home } from './Pages/Home.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { SideBar } from './Components/SideBar';
import { About } from './Pages/About';
import { Contact } from './Pages/Contact';
import { Education } from './Pages/Education';
import { Project } from './Pages/Project';
import { Skills } from './Pages/Skills';


function App() {
  return (
    <div className='main-container'>
      <SideBar/>
      <Home/>
      <About/>
      <Skills/>
      <Project/>
      {/* <Education/> */}
      <Contact/>
      {/* <BrowserRouter>
      <SideBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/education' element={<Education/>} />
        <Route path='/project' element={<Project />} />
        <Route path='/skills' element={<Skills />} />
      </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
