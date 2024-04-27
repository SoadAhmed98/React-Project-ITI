import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Product_details from "./pages/Product_details";
import Login from './pages/login';
import Register from './pages/register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Favourite from './pages/favourite';
import Cart from './pages/cart';
import NotFound from './pages/notFound';
function App() {
 
  return (
    <>
     <Router>
        <Routes>
             <Route exact path="/login"  element={<Login/>}></Route>
             <Route exact path="/register"  element={<Register/>}></Route>
             <Route exact path="/favourites"  element={<Favourite/>}></Route>
             <Route exact path="/cart"  element={<Cart/>}></Route>
             <Route  path="/productDetails/:id" element={<Product_details/>}></Route>
             <Route exact path="/"  element={<Home/>}></Route>
             <Route  path="*"  element={<NotFound/>}></Route>
        </Routes>
     </Router>
    </>
  );
}

export default App;
