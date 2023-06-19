import classes from "./AvailableMeals.module.css" ;
import Card from "../UI/Card";
import MealItem from "./MealItem";
import { useEffect  , useState} from "react";




const AvailableMeals = ()=>{

    const[meals , setMeals] = useState([]);
    const[isLoading , setIsLoading] = useState(true);
    const[httperror , setHttpError] = useState(false);

    useEffect(()=>{
        const fetchMeals = async () =>{
             const response = await fetch('https://foodorder-9bf63-default-rtdb.firebaseio.com/meals.json');
             if(!response.ok){
                 throw new Error("fetch meals data faild!");
             }
             const responseData = await response.json();
              
             const loadedData = [];

             for(const key in responseData){
                 loadedData.push({
                     id:key,
                     name : responseData[key].name,
                     description: responseData[key].description,
                     price: responseData[key].price
                 })
             }

               setMeals(loadedData);
               setIsLoading(false);
        }

      
        fetchMeals().catch(error =>{
            setIsLoading(false);
        setHttpError(error.message);
        });
      
        
        
    }, [])


    if(isLoading){
         return <section className={classes.isLoading}>
             <p>loading...</p>
         </section>
    }

    if(httperror){
        return <section className={classes.MealsError}>
        <p>{httperror}</p>
    </section>
    }

    const MealsList = meals.map(meal => <MealItem key={meal.id} name ={meal.name} id={meal.id} description={meal.description} price={meal.price} />);
     return <div className={classes.meals}>
     <Card>
        <ul>
         {MealsList}
        </ul>
        </Card>
     </div>
}

export default AvailableMeals;