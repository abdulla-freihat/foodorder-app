import classes from "./CheckOutForm.module.css";
import { useRef  , useState} from "react";


const isEmpty = value => value.trim() === "";
const isFiveChars = value => value.trim() === 5;

const CheackOutForm = (props)=>{

    const[formInputValidity , setFormInputValidity] = useState({
        name:true,
        street :true,
        city : true,
        postal:true
    })


   

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    const submitHandler = (e)=>{
       e.preventDefault();

         const enteredName = nameInputRef.current.value;
         const enteredStreet = streetInputRef.current.value;
         const enteredPostal = postalInputRef.current.value;
         const enteredCity = cityInputRef.current.value; 

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
       
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = !isFiveChars(enteredPostal);

        setFormInputValidity({
            name: enteredNameIsValid,
            street:enteredStreetIsValid,
            city:enteredCityIsValid,
            postal:enteredPostalIsValid
        })


        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;

        if(!formIsValid){
            return;
        }


        //submit order
        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            postal : enteredPostal
        })
        
    }
       
    return <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
            <input type="text" id="name" ref={nameInputRef}/>
            {!formInputValidity.name && <p className={classes.formNotValid}>please enter valid name!</p>}
        </div>
        <div className={classes.control}>
        <label htmlFor="street">Street</label>
            <input type="text" id="street" ref={streetInputRef} />
            {!formInputValidity.street && <p className={classes.formNotValid}>please enter valid street!</p>}
        </div>
        <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
            <input type="text" id="postal" ref={postalInputRef}/>
            {!formInputValidity.postal && <p className={classes.formNotValid}>please enter valid postal!</p>}
        </div>
        <div className={classes.control}>
        <label htmlFor="city">City</label>
            <input type="text" id="city" ref={cityInputRef} />
            {!formInputValidity.city && <p className={classes.formNotValid}>please enter valid city!</p>}
        </div>
        <div className={classes.actions}>
        <button type="button" onClick={props.onCansel}>Cansel</button>
        <button type="submit" className={classes.submit}>Confirm</button>
        </div>
    </form>
}


export default CheackOutForm;