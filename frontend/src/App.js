
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from '../src/components/Home';
import About from '../src/components/About';
import Contact from '../src/components/ContactUs';
import Services from '../src/components/Services';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
      <Route path='/' Component={Home}></Route>
      <Route path='/about' Component={About}></Route>
      <Route path='/services' Component={Services}></Route>
      <Route path='/contact' Component={Contact}></Route>
      <Route path='/signup' Component={Signup}></Route>
      </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
