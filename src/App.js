import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import React,{useState} from "react";
import CartProvider from "./store/CartProvider";

function App() {

  const [showModel , setShowModel] = useState(false);


   const showCartHandler = ()=>{
     setShowModel(true)
   }

   const hideCartHandler = ()=>{
      setShowModel(false);
   }
  return (
    <CartProvider>
    {showModel && <Cart closeCart={hideCartHandler} />}
     <Header openCart= {showCartHandler} />
      <Meals />
    </CartProvider>
  );
}

export default App;
