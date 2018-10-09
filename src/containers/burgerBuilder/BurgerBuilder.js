import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-instance'
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/action'

/*  NOW HANDLED BY REDUX */
// const INGREDIENTS_PRICE = {
//     salad: 0.5,
//     meat: 0.7,
//     bacon: 0.6,
//     cheese: 0.6
// }





class BurgerBuilder extends Component {
    //    constructor(props){
    //     super(props);
    //     this.state ={
    //         ingredients
    //     }   
    // }

    state = {
        // ingredients: null,  We are not using local state anymore for ingredients and totalPrice
        // totalPrice: 4,
        purchasable: false,
        showSummary: false,
        checkOutProgress: false,
        error: false
        // ingredientsList:['salad','bacon', 'cheese','meat']

    }

    componentDidMount(){
        console.log(this.props);
        console.log("didMount")
/*
This particular http call will be handled in redux
*/

        // axios.get('https://react-burger-65c1d.firebaseio.com/ingredients.json')
        // .then(response => {
        //  return  this.setState({ ingredients: response.data })
        // })
        // .catch(()=>{ this.setState ({error :true})})

    } 
       
    updatePurchaseState = (updatedIngredients) => {

        const sum = Object.keys(updatedIngredients).map((igkey) => {
            return updatedIngredients[igkey]
        })
            .reduce((prev, curr) => {
                return prev + curr
            }, 0)
        this.setState({
            purchasable: sum > 0
        })
    }
   /* removed to old add/remove handlers, as they are now maintained in redux

    purchasehandler = () => {
        this.setState({ showSummary: true })
    }

    modalCloseHandler = () => {
        this.setState({
            showSummary: false
        })
    }

    checkouthandler = () => {
        console.log("executing checouthandler")
        // this.setState({ checkOutProgress: true })
        // const orderData = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'abc',
        //         address: {
        //             street: 'testStreet',
        //             zipcode: 2234,
        //             country: 'india'
        //         },
        //         email: 'test@ytest.com',
        //         deliveryMethod: 'fastest'
        //     }
        // }

        // axios.post('/order.json', orderData)
        //     .then((response) => {
        //         console.log(response)
        //         this.setState({
        //             showSummary: false,
        //             checkOutProgress: false
        //         })
        //     })
        //     .catch((error) => {
        //         console.log('burgerbuilder axios error')
        //         console.log(error)
        //         this.setState({
        //             showSummary: false,
        //             checkOutProgress: false
        //         })
        //     })

        const queryParams=[];
        for(let i in this.props.ingredients){
            //Converting to an array of strings ['salad=1','meat=2',......]
            
          queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]))
        }

        queryParams.push("price=" + this.state.totalPrice)
         const queryString= queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search : '?' + queryString
        })

    }
    render() {
        const disableInfo = {
            ...this.props.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let burger = this.state.error ? <p>Can't load the ingredients</p> : <Loader />
        let orderSummary = null;
        console.log(this.props.ingredients)
        if (this.props.ingredients) {
            burger =
                (<Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        addIngredient={(type) => this.props.onAddIngredient(type)}
                        removeIngredient={(type) => this.props.onRemoveIngredient(type)}
                        disableInfo={disableInfo}
                        totalPrice={this.props.totalPrice}
                        purchasable={this.state.purchasable}
                        order={this.purchasehandler} />
                </Aux>);

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                totalPrice={this.props.totalPrice}
                close={this.modalCloseHandler}
                proceed={this.checkouthandler} />
        }



        if (this.state.checkOutProgress === true) {

            orderSummary = <Loader />
            console.log(orderSummary)
        }

        return (
            <Aux>

                <Modal show={this.state.showSummary} closeModal={this.modalCloseHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        )
    }
}

const mapStateToProps=( state)=> {
  return  {
    ingredients : state.ingredients ,
    totalPrice : state.totalPrice
}
    }
  

const mapDispatchToProps =( dispatch) =>{
    return {
        onAddIngredient : (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName : ingredientName}),
        onRemoveIngredient : (ingredientName) =>dispatch({ type: actionTypes.REMOVE_INGREDIENT,ingredientName : ingredientName})
    }

}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))



//You can wrap a component in an hoc, the hoc will get the wrappedComponent and any other paramater you pass.
//The hoc return another component, either class based or functional component



//The old impementation in the component
 addIngredienthandler = (type) => {
        const newCount = this.state.ingredients[type] + 1;
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = newCount;
        // const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return
        }
        const newCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = newCount;
        // const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);

    }