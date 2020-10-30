import React, {Component} from 'react';
//import UserLayout from '../../hoc/layout';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class UserDashboard extends Component {
    render() {
        console.log('this.props.user.userData.userId: !!!!!!!!!!!!!!!!!!')
        console.log(this.props.user.userData.userId);
        return (
            //<UserLayout>
                <div>
                    USER'S DASHBOARD PUNK BITCH!!!!
                    USER'S DASHBOARD PUNK BITCH!!!!
            
                    USER'S DASHBOARD PUNK BITCH!!!!
                    USER'S DASHBOARD PUNK BITCH!!!!
                    USER'S DASHBOARD PUNK BITCH!!!!
                </div>
            //</UserLayout>
        
         );
    }
};

const mapStateToProps=(state)=>{
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(UserDashboard);