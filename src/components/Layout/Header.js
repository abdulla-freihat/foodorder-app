
import MealsImage from "../../assests/meals.jpg"
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
 const Header = (props)=>{
      return <>
         <header className={classes.header}>
         <h1>Food Order</h1>
         <HeaderCartButton openCart = {props.openCart}/>
         </header>
         <div className={classes['main-image']}>
            <img src={MealsImage} />
         </div>          
      </>
 }

 export default Header;