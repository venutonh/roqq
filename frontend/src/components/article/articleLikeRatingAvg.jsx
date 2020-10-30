import React, { Component } from 'react';
//import { connect} from 'react-redux';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';



const Styles = styled.div`



.like_pie_graph {
    
    
   
    margin-bottom:1000vh;


    height:400px;
    width:400px;
   
    clip-path: url(#cgope);
  }


    

`

class LikeRatingAvg extends Component {

    render() {
        const {avgLike} = this.props;
        const notLike = (1-avgLike);
        return (
            <div>
                <Styles>
                    <div className="like_pie_graph">
                        
                         <Pie 
                         ref="like_pie"
                         backgroundColor='yellow'
                         borderWidth='0'
                         options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            events: []
                            //hoverBackgroundColor:none
                         }}
                         legend={{
                            display:false
                         }}
                         
                        //labels={['Average Number of Likes']}
                         data={{
                            
                            datasets: [{
                                data: [avgLike, notLike],
                                backgroundColor:['yellow',' #ddd']
                            }]
                         }}
                         />
                        
                    </div>    
                </Styles>

                <svg>
                    <clipPath className= "star" id="cgope" clipPathUnits="objectBoundingBox" >

         
                    <path d=" M 0.5 0.38 C 0.503 0.38 0.545 0.446 0.547 0.448 C 0.55 0.45 0.625 0.469 0.626 0.472 C 0.627 0.475 0.577 0.534 0.576 0.537 C 0.575 0.54 0.58 0.617 0.578 0.619 C 0.575 0.621 0.503 0.593 0.5 0.593 C 0.497 0.593 0.425 0.621 0.423 0.619 C 0.42 0.617 0.425 0.54 0.424 0.537 C 0.423 0.534 0.374 0.475 0.375 0.472 C 0.376 0.469 0.45 0.45 0.453 0.448 C 0.456 0.446 0.497 0.38 0.5 0.38 Z "/>            
                   </clipPath>
                </svg>
                

            </div>
        )
    }
}

export default LikeRatingAvg;