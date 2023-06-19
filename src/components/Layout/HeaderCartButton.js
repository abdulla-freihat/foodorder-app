import { useContext } from "react";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { useState , useEffect } from "react";
const HeaderCartButton =(props)=>{
    const [btnIsHighLighted , setBtnIsHighLighted] = useState(false);
    const cartCtx = useContext(CartContext);


    const {items} = cartCtx;

    const numberOfCartItems = items.reduce((curr , item)=> {
        return curr + item.amount;
    } , 0);




       const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump : "" }`;
    

        useEffect(()=>{
            if(items.length > 0 ){
                setBtnIsHighLighted(true); 
            }else{
                return;
            }


            setTimeout(()=>{
                setBtnIsHighLighted(false); 
            } , 1000)

               

            
           
        } , [items])
     return <button className={btnClasses} onClick={props.openCart}>
          <span>Your Cart</span>
          <span className={classes.badge}>{numberOfCartItems}</span>
     </button>

     
}
export default HeaderCartButton;