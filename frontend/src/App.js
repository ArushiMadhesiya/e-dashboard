
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from '../src/components/Home';
import About from '../src/components/About';
import Contact from '../src/components/ContactUs';
import Services from '../src/components/Services';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
      <Route Component={PrivateComponent}>
      <Route path='/' Component={Home}></Route>
      <Route path='/about' Component={About}></Route>
      <Route path='/services' Component={Services}></Route>
      <Route path='/contact' Component={Contact}></Route>
      <Route path='/add' Component={AddProduct}></Route>
      <Route path='/products' Component={ProductList}></Route>
      <Route path='/update/:id' Component={UpdateProduct}></Route>
      </Route>
      <Route path='/signup' Component={Signup}></Route>
      <Route path='/login' Component={Login}></Route>
      </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
