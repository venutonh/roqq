import React, { Component } from 'react';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { withRouter } from 'react-router-dom';


import { loginUser } from '../../actions/user_actions';
import { connect} from 'react-redux';


class Login extends Component {

        state={
            formError: false,
            formSuccuss: '',
            formdata:{
                email: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'email_input',
                        type: 'email',
                        placeholders: 'Enter your email'
                    },
                    validation:{
                        required: true,
                        email: true
                    },
                    valid: false,
                    touched: false,
                    valdationMessage:''
                },
                password_hash: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'password_input',
                        type: 'password',
                        placeholders: 'Enter your password'
                    },
                    validation:{
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    valdationMessage:''
                }
            } 
        }
        

        
        updateForm = (element) => {
            const newFormdata = update(element,this.state.formdata,'login');
            this.setState({
                formError: false,
                formdata: newFormdata
            })
        }

        submitForm= (event) =>{
            event.preventDefault();
            
            console.log('submitting form!!!!!!!!!!');

            let dataToSubmit = generateData(this.state.formdata,'login');
            let formIsValid = isFormValid(this.state.formdata,'login');
            console.log(dataToSubmit);
        
            if(formIsValid ){
                console.log("form is valid dip shit!")
                console.log(dataToSubmit);
                this.props.dispatch(loginUser(dataToSubmit)).then(response =>{
                    if(response.payload.loginSuccess){
                        console.log(response.payload);
                        this.props.history.push('/user/dashboard');
                    }else{
                        this.setState({
                            formError: true
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
        return (
            <div className="signin_wrapper">
                <form onSubmit={(event)=> this.submitForm(event)}>
                
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element)=> this.updateForm(element)}
                    />

                    <FormField
                        id={'password_hash'}
                        formdata={this.state.formdata.password_hash}
                        change={(element)=> this.updateForm(element)}
                    />

                    { this.state.formError ?
                        <div className="error_label">
                            Please check your data
                        </div>
                    :null}
                    <button onClick={(event)=> this.submitForm(event)}>
                        Log in
                    </button>
                    <button 
                        style={{marginLeft:'10px'}}
                        onClick={()=> this.props.history.push('/reset_user') }>
                       Forgot my password
                    </button>


                </form>
            </div>
        );
    }


}

export default connect()(withRouter(Login));