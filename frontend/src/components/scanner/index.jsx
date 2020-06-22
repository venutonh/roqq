import React, { Component } from 'react'

import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { withRouter } from 'react-router-dom';

import { findArticle } from '../../actions/user_actions';
import { connect} from 'react-redux';
import { Spinner } from 'reactstrap';



class Scanner extends Component {

    state={
            isLoading: false,
            formError: false,
            formSuccuss: '',
            formdata:{
                url_scanner: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'url_scanner',
                        type: 'text',
                        placeholders: 'Enter article URL here'
                    },
                    validation:{
                        required: true,
                        url: true
                    },
                    valid: false,
                    touched: false,
                    valdationMessage:''
                }
        }
    }


    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'url_scanner');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }



    submitForm= (event) =>{
        event.preventDefault();
        
        console.log('submitting URL!!!!!!!!!!');

        let dataToSubmit = generateData(this.state.formdata,'url_scanner');
        let formIsValid = isFormValid(this.state.formdata,'url_scanner');
        console.log(dataToSubmit);
    
        if(formIsValid ){
            this.setState({
                isLoading:true
            })

            console.log("URL form is valid dip shit!")
            console.log("Url scanner data: ");
            console.log(dataToSubmit);
            this.props.dispatch(findArticle(dataToSubmit)).then(response =>{
                if(response.payload.urlSuccess){
                    console.log(response.payload);
                    this.props.history.push('/user/writereview');
                }else{
                    this.setState({
                        formError: true,
                        isLoading: false
                    })
            }
            });
         } else {
             this.setState({
                 formError: true
             })
        }
    }




    render() {
        if(this.state.loading){
            return (
                <div className="main_loader">
                    <Spinner 
                        size="sm" 
                        color="primary" 
                        />
                </div>
            )
        }



        return (
            <div className="scanner_input_box">
                <form onSubmit={(event)=> this.submitForm(event)}>
                    <FormField
                        id={'url_scanner'}
                        formdata={this.state.formdata.url_scanner}
                        change={(element)=> this.updateForm(element)}
                    />
                
                <button onClick={(event)=> this.submitForm(event)}>
                        Find Article
                </button>

                </form>
            </div>
        );
    }
}
    const mapStateToProps=(state)=>{
        return {
            user: state.user
        }
    }


export default connect(mapStateToProps)(withRouter(Scanner));
