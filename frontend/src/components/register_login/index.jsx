import React from 'react';
import { Button } from 'reactstrap';
import Login from './login';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Members</h1>
                        <p>Would you like to sign up and join the leading fact warriors?</p>
                        <Button 
                            color="secondary"
                            size="sm"
                            class="create_an_account"
                            href="/register"
                            active
                            >
                        Create an account
                        </Button>
                    </div>
                    <div className="right">
                        <h2>Registered Members</h2>
                        <p>If you already have any account please log in</p>
                        <Login/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;