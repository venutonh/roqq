import React, { Component } from 'react';
import {checkEligibility } from '../utils/misc';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import faHandShake from '@fortawesome/fontawesome-free-solid/fa-handshake';
//import faHandShake from '@fortawesome/fontawesome-free-regular/';
//import {fas,faHandShake }from '@fortawesome/fontawesome-free-solid/';

import {faHandShake} from '@fortawesome/free-regular-svg-icons';
//import {faHandShake as boldFaHandShake }from '@fortawesome/free-solid-svg-icons';
import { IconContext } from "react-icons";
import { FaHandshake, FaRegHandshake, FaRegHandPointUp, FaHandPointUp } from 'react-icons/fa';

import { GoArrowUp } from 'react-icons/go';
import { icon } from '@fortawesome/fontawesome-svg-core';


class Vote extends Component {

    state={
        //since all comments under article get blurred out once one review
        // is voted on or review is written.
        clicked:false,
        eligible:false,

        reviewed:false,
        voted:false,
        sendTimer:setTimeout(function(){return null;},3000)

    }


     componentDidMount=()=>{

     }



    checkEligibility=(eligible,reviewCheck,voteCheck,reviewId)=>{
        if(this.props.user){
            if(eligible && !reviewCheck && !voteCheck){
                return true;
            }if(!eligible && reviewCheck && !voteCheck){
                return false;
            }if(!eligible && !reviewCheck && voteCheck){
                if(voteCheck.reviewId===reviewId){
                    return true + clicked;
                } else{
                    false;
                }
            }
            // if(!eligible && !voteCheck &&  !reviewCheck){
            //     return false + sign in;
            // }
        }else{
            return false;// +sign in;
        }
    }



    handleClick=(e,reviewId,reviewInfo)=>{
        if(!this.state.clicked){

            this.setState({
                clicked: true
            })
           
        // clearTimeout(this.state.sendTimer);    
        // this.state.sendTimer = //setTimeout(function(){ alert("Hello"); },3000)
        // setTimeout(this.props.dispatch(voteArticle(dataToSubmit)),6000);

        // } else {
        //     this.setState({
        //         clicked: false 
        //     })
            
        //     clearTimeout(this.state.sendTimer);    
        //     this.state.sendTimer = //setTimeout(function(){ alert("sent/"); },3000)
        //     setTimeout(this.props.dispatch(voteArticle(dataToSubmit)),6000);

         }
    }



    showIcon=()=>(
        this.state.clicked ?  
        <IconContext.Provider value={{color:'blue',size:'1.4em'}}>
            <FaRegHandshake/> 
        </IconContext.Provider>
        : 
        <IconContext.Provider value={{color:'gray',size:'1.4em'}}>
            <FaRegHandshake/>
        </IconContext.Provider>
    )


    render() {
        const {reviewInfo,articleId,eligible,reviewCheck,voteCheck,} = this.props;
        return (
            <div>
                <div>
                    <button 
                        onClick={(e)=>this.handleClick(e,reviewInfo.reviewId,reviewInfo)}
                        disabled={this.checkEligibility(this.state.eligible)}   
                    >
                        {this.showIcon(reviewCheck,voteCheck)}
                    </button>
                
                </div>

                <div>
                    {reviewInfo.vote_total+}
                </div>
                <div>
                    agree
                </div>
                <div>
                    {reviewVoteTotal+this.state.change}
                </div>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        user:    state.user

    }
}

export default Vote;