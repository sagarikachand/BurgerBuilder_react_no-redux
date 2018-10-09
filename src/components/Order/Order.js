import React from 'react'
import classes from './Order.css'


const Order =(props) =>{

    let ingredientsList = [];
    
    for(let igKey in props.ingredients){
     
        ingredientsList.push( <span 
            style={  {textTransform : 'capitalise',
                    display: 'inline-block',
                    margin:'5px',
                    border:'1px solid #eee'}}>
             {igKey} : ({props.ingredients[igKey]})</span>)
     
    }

    return(
        <div className={classes.Order}> 
           <p> Ingredients: {ingredientsList} </p>
           <p> Price : <strong>USD {props.price.toFixed(2)}</strong></p>

        </div>
    )

}

export default Order;