import React ,{useEffect} from 'react';
import { BrowserRouter,Routes,Route,useLocation } from 'react-router-dom';
import './App.css';
import Home from "./scenes/home/Home"
import Navbar from './scenes/global/Navbar';
import ItemDeatils from './scenes/home/ItemDeatils';
import Footer from './scenes/global/Footer';
import CartBox from './scenes/global/CartBox';

const ScrollToUp=()=>{
  const {pathname}=useLocation();
   

  useEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])

  return null;
}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <ScrollToUp/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/item/:id" element={<ItemDeatils/>}/>
      </Routes>
      <CartBox />
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
