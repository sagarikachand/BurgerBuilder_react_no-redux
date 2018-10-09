import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-instance'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


class Orders extends Component {
    state={
        orders: [],
        loading: true
    }

    componentWillMount (){
        axios.get('/order.json')
        .then( (response) =>{
            console.log(response)
            let fetchedOrders=[];
            for( let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id:key
                })
            }
            this.setState({ orders:fetchedOrders, loading: false})
        })
        .catch( (error) =>{
            console.log('error in order fetch')
            this.setState({loading : false})
        })
    }
    /// The parameters from firebase will be string. That is the price will be string. COnvert to numbers.
    render(){
        let orders=null;
        if(this.state.orders){
            orders= this.state.orders.map( (order) =>{
                console.log(order.ingredients)
                   return <Order key={order.id} ingredients={order.ingredients} price={+order.price}/>
            })
        }
        return(
           <div>
              {orders}
           </div>
        )
    }
}


export default withErrorHandler(Orders,axios);