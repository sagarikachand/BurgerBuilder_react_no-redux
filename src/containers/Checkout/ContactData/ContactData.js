import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-instance'
import Loader from '../../../components/UI/Loader/Loader'
import Input from '../../../components/UI/Input/Input'


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: 'max'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: 'testStreet'
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP'
                },
                value: '2344'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: 'India'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: 'aaa@jjj.com'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: 'fastest'
            }
        },

        checkOutProgress: false
    }

    inputChangeHandler = (event, inputIdentifier) => {
       
        //First clone the entire orderForm. But this is not a deep copy. The inner Object are still same

        let updatedOrderForm = { ...this.state.orderForm }
        //Now make a clone of the inner object whose value we have to update
        //As here we are only updating the value property and not any property inside the elementConfig object so we need not clone object any further.
        //If necesaary we have to make deep copy of any neseted object where there is a change.

        let updatedFormElement = { ...this.state.orderForm[inputIdentifier] }
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        //Finally calling setstate to update the state.
        this.setState({ orderForm: updatedOrderForm })
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ checkOutProgress: true })

        const formData= {}
        for(let inputidentifier in this.state.orderForm){
            formData[inputidentifier] = this.state.orderForm[inputidentifier].value;
        }
        const orderData = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: formData
         }

        axios.post('/order.json', orderData)
            .then((response) => {
                console.log(response)

                this.setState({

                    checkOutProgress: false
                })
                this.props.history.push('/')
            })
            .catch((error) => {
                console.log('contactData axios error')
                console.log(error)
                this.setState({

                    checkOutProgress: false
                })
            })

    }

    render() {
        let formElementArr = [];
        for (let key in this.state.orderForm) {
            formElementArr.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        console.log(formElementArr)
        let form = (<form onSubmit={this.orderHandler}>
            {formElementArr.map((formElement) => {
                return <Input key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangeHandler(event, formElement.id)} />
            })}
            <Button btnType="Success">ORDER </Button>
        </form>
        )

        if (this.state.checkOutProgress) {
            form = <Loader />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Details</h4>
                {form}
            </div>

        )
    }
}
export default ContactData