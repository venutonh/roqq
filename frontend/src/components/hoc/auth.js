import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../actions/user_actions';

import { Spinner } from 'reactstrap';


export default function (ComposedClass, reload, adminRoute = null) {
    class AuthenticationCheck extends Component {

        state = {
            loading: true
        }

        componentDidMount(){
            console.log("INSIDE FrontEnd AUTH before dispatch")
            this.props.dispatch(auth()).then(response =>{
                //console.log("back in frontend");
                let user = this.props.user.userData;
                console.log(user);
                console.log("YEEEESSSSSSS");
                console.log(this.props.user.userData);

                console.log("!!!!!!!NEEED TO SEE THIS LOG: INSIDE FrontEnd AUTH after dispatch");
                if(!user.isAuth){
                    if(reload){
                        this.props.history.push('/register_login')
                    }
                } else{
                    if(adminRoute && !user.isAdmin){
                        this.props.history.push('/user/dashboard')
                    } else{
                        if(reload === false){
                            this.props.history.push('/user/dashboard')
                        }
                    }
                }
                this.setState({loading:false})
            })
        }
    
    render(){
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
            <ComposedClass {...this.props} user={this.props.user}/>
        );

    }

        }

    function mapStateToProps(state){
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck)

}
