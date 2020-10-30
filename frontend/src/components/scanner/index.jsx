import React, { Component } from 'react'

import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { withRouter } from 'react-router-dom';

import { findArticle } from '../../actions/article_actions';
import { connect} from 'react-redux';
import { Spinner } from 'reactstrap';

import './scanner.css';


class Scanner extends Component {

    state={
            isLoading: false,
            userIdentity:-1,
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


    //  componentDidMount=()=>{

    //      let userIdentity = (this.props.user.userData.userId ? 
    //                              this.props.user.userData.userId 
    //                          : -1);

    //      this.setState({
    //          userIdentity: userIdentity
           
    //      })
    // }


    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'url_scanner');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }



    submitForm= (event) =>{
        event.preventDefault();
        
        //let generatedFormData = generateData(this.state.formdata,'url_scanner');
        //const account_id = this.props.user.userData.userId;

        let dataToSubmit={
            url_scanner: this.state.formdata.url_scanner.value,
            //account_id: userIdentity
        }
        let formIsValid = isFormValid(this.state.formdata,'url_scanner');
       
        if(formIsValid ){
            this.setState({
                isLoading:true
            })

            this.props.dispatch(findArticle(dataToSubmit)).then(response =>{
                if(response.payload.urlSuccess){
                    this.props.history.push('/user/writereview');
                } if (response.payload.urlIneligible) {
                    if(!this.props.user.userData){
                        this.props.history.push('/register_login');
                    }else{
                        const id=response.payload.article_id;
                        this.props.history.push(`/article/review/${id}`);
                    }
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

        // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
        // console.log('this.props.user.userData.userId:')
        // console.log(this.props.user.userData.userId)

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
                        style={{'width':'20em'}}
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
        user:    state.user
        
    }
}

export default connect(mapStateToProps)(withRouter(Scanner));
