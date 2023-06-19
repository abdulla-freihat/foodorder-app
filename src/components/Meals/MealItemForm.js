
import classes from "./MealItemForm.module.css";
import { useRef , useState } from "react";

const MealItemForm = (props)=>{
      const[validAmount , setValidAmount] = useState(true);
    const amountInputRef = useRef();

const submitHandler =(e)=>{
       e.preventDefault();

       const enteredAmount = amountInputRef.current.value;
       const enteredAmountNumber = +enteredAmount;

       if(enteredAmount.trim().length ===0 || enteredAmountNumber < 1 || enteredAmountNumber >5){
         setValidAmount(false);
         return;
       }

       props.onAddToCart(enteredAmountNumber);
}
     return <form onSubmit={submitHandler} className={classes.form}>
     
         <input ref={amountInputRef} type="number" min="1" max="5" step="1" defaultValue="1" className={classes.input}/>
         <button type="submit">+ Add</button>
         {!validAmount && <p>please enter a valid amount(1-5).</p>}
     </form>
}


export default  MealItemForm;