
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import React , { useContext , useState  , useEffect } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheackOutForm from "./CheckOutForm";


 const Cart = (props)=>{

    const[isCheckOut , setIsCheckOut] = useState(false);
    const [didSubmit , setDidSubmit] = useState(false);
    const[error , setError] = useState(false);

     const cartCtx = useContext(CartContext);

     const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;

     const hasItems = cartCtx.items.length>0;

     const addItemHandler = item =>{
       cartCtx.addItem(item);
     }

     const removeItemHandler = id =>{
       cartCtx.removeItem(id);
     }

     const checkOutHandler =()=>{
         setIsCheckOut(true)
     }


     const submitOrderHandler =async(userData)=>{
         const response = await fetch("https://foodorder-9bf63-default-rtdb.firebaseio.com/orders.json",
         {
           method:"POST",
           body:JSON.stringify({
            user : userData,
            orderItems: cartCtx.items
           })
         }
         )
         
         if(!response.ok){
            throw new Error("send data falied!");
        }

     

             
            setDidSubmit(true)
           
        
         
     }


    
       

    
         
    const cartItems = <ul className={classes["cart-items"]}> { cartCtx.items.map(item =>(
         <CartItem key={item.id} name={item.name} amount ={item.amount} price={item.price} onAdd={addItemHandler.bind(null,item)} onRemove={removeItemHandler.bind(null,item.id)} />
    ))} </ul>

const cartModelContent =<> {cartItems}
<div className={classes.totalAmount}>
    <span className={classes.total}>Total Amount </span>
    <span className={classes.totalValue}>{totalAmount}</span>
</div>
{isCheckOut && <CheackOutForm onConfirm={submitOrderHandler} onCansel={props.closeCart} />}
{!isCheckOut && <div className={classes.actions}>
    <button className={classes["button--alt"]} onClick={props.closeCart}>Close</button>
   { hasItems &&  <button className={classes.button} onClick={checkOutHandler}>Order</button>}
</div>}</>


const didSubmitModalContent = <p className={classes.sentOrder}>Succesfully sent the order</p>;
const errorSubmitModalContent = <p>send data failed!</p>
      return(
        <Modal closeCart={props.closeCart}>

           {!didSubmit && cartModelContent}
           
               {didSubmit && didSubmitModalContent}
               {error && errorSubmitModalContent}
            </Modal>
            
      )
 }
 export default Cart;