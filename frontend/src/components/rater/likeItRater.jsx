import React, { Component } from 'react';
import styled from 'styled-components';

    


    const StylesA = styled.div`
    
   .sliderLike {
        
        -webkit-appearance: none;
        outline: none;
        width: 30px;
        height: 30px;
        clip-path: url(#cgope);

        ::-webkit-slider-runnable-track {
            background: #ddd;
        }        
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 0px; 
            height: 30px;
            box-shadow: -30px 0 0 30px dodgerblue;
        }
    `;

    // const StylesB = styled.div`

    // .like_slider{
    //     top:0;
    //     height:100%;
    // }

    // .hide_svg{
    //     top:100%;
    //     display:none

    // }

    // `;

    


class LikeItRater extends Component {

    

    render() {
        
        const {value, onInputChange} = this.props;
        const val = (this.props.value)/2;

        

        return (
            <div>
                {/* <StylesB> */}
                    <div className="like_slider">
                        <StylesA>
                        
                            <input
                                type='range'
                                className='sliderLike'
                                min={0}
                                max={2}
                                value={value}
                                step={1}
                                onChange={onInputChange}

                            />
                            {/* <div className='range_marker'>
                                {val}
                            </div> */}
                        </StylesA>
                    </div>
                    <div className="hide_svg">
                        <svg height="0" width="0">
                            <clipPath id="cgope" clipPathUnits="objectBoundingBox" height="0" width="0">

                            <path d=" M 0.5 0 C 0.513 0 0.677 0.26 0.687 0.268 C 0.698 0.275 0.996 0.351 1 0.363 C 1.004 0.376 0.807 0.612 0.803 0.624 C 0.799 0.637 0.82 0.943 0.809 0.951 C 0.798 0.959 0.513 0.844 0.5 0.844 C 0.487 0.844 0.202 0.959 0.191 0.951 C 0.18 0.943 0.201 0.637 0.197 0.624 C 0.193 0.612 -0.004 0.376 0 0.363 C 0.004 0.351 0.302 0.275 0.313 0.268 C 0.323 0.26 0.487 0 0.5 0 Z "/>                    
                    
                            </clipPath>
                        </svg>
                        
                    </div>
                {/* </StylesB> */}
        </div>
        )
    }
}
export default LikeItRater;