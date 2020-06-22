import React, { Component } from 'react';
import TitleUrlAuthor from './titleUrlAuthor';
import Rater from './rater';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';



class WriteReview extends Component {

    state={
        formdata:{
            review: {
                element: 'textarea',
                value: '',
                config: {
                    name: 'review',
                    type: 'textarea',
                    placeholders: 'Write review here'
                },
                validation:{
                    required: false
                
                },
                valid: false,
                touched: false,
                valdationMessage:''
            }

        } 
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'review');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm= (event) =>{
        event.preventDefault();
        
        console.log('submitting form!!!!!!!!!!');

        let dataToSubmit = generateData(this.state.formdata,'review');
        let formIsValid = isFormValid(this.state.formdata,'review');
        console.log(dataToSubmit);
    }
        //if(formIsValid ){
        //    console.log("form is valid dip shit!")
        //    console.log(dataToSubmit);
        //    this.props.dispatch(loginUser(dataToSubmit)).then(response =>{
        //        if(response.payload.userData){
        //            console.log(response.payload);
        //            this.props.history.push('/user/dashboard');
        //        }else{
        //            this.setState({
        //                formError: true
        //            })
        //    }
        //    });
        // } else {
        //     this.setState({
        //         formError: true
        //     })
       // }
    //}


    render() {
        

        return (
            <div className="review_wrapper">
                Write a review
               <TitleUrlAuthor/>
               <Rater/>


                <form onSubmit={(event)=> this.submitForm(event)}>
                
                    <FormField
                        id={'review'}
                        formdata={this.state.formdata.review}
                        change={(element)=> this.updateForm(element)}
                    />

                </form>

            </div>
        )
    }
}



export default WriteReview;