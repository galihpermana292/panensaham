import './App.css';
import Navbar from './components/Navbar'
import Market from './components/pages/Market'
import OrderBook from './components/pages/OrderBook '
import Quotes from './components/pages/Quotes'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

function App() {
  return (
    <div >
       <Navbar />
       <Routes>
              <Route exact path="/" element={<Market />} />
              <Route path="/OrderBook" element={<OrderBook />} />
              <Route path="/Quotes" element={<Quotes />} />
       </Routes>
    </div>
  );
}

export default App;
