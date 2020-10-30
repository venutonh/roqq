import React, { Component } from 'react';
import styled from 'styled-components';


//height:100%;


    const StylesA = styled.div`
    
    .slider {
        
        -webkit-appearance: none;
        outline: none;
        position:relative;
        width: 60px;
        height: 60px;
        clip-path: url(#bgope);

        ::-webkit-slider-runnable-track {
            background: #ddd;
            
        }        
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 0px; 
            height: 60px;
            background:#fff;
            box-shadow: -60px 0 0 60px dodgerblue;
            
        }
        
    
    `;
    const StylesB = styled.div`

   

    .hide_svg_sp{
        top:100%;
        display:none

    }

    `;



class SpellPuncRater extends Component {

    
    render() {
        
        const {value, onInputChange} = this.props;
        const val = (this.props.value)/2;


        return (
            <div>
                 
                    <div className='sp_slider'>
                        <StylesA>
                            
                            <input
                                type='range'
                                className='slider'
                                min={0}
                                max={4}
                                value={value}
                                step={1}
                                onChange={onInputChange}
                            />
                            {/* <div className='range_marker'>
                                {val}
                            </div> */}
                        </StylesA>
                    </div>   
                    <div className='hide_svg_sp'>
                        <svg height="0" width="0">
                            <clipPath id="bgope" clipPathUnits="objectBoundingBox">

                            <path d=" M 0.251 0 C 0.257 0 0.34 0.13 0.345 0.134 C 0.35 0.138 0.5 0.176 0.502 0.182 C 0.504 0.188 0.405 0.307 0.403 0.313 C 0.401 0.319 0.411 0.473 0.406 0.477 C 0.401 0.481 0.257 0.424 0.251 0.424 C 0.244 0.424 0.101 0.481 0.096 0.477 C 0.091 0.473 0.101 0.319 0.099 0.313 C 0.097 0.307 -0.002 0.188 0 0.182 C 0.002 0.176 0.152 0.138 0.157 0.134 C 0.162 0.13 0.244 0 0.251 0 Z "/>
                            <path d=" M 0.749 0 C 0.756 0 0.838 0.13 0.843 0.134 C 0.848 0.138 0.998 0.176 1 0.182 C 1.002 0.188 0.903 0.307 0.901 0.313 C 0.899 0.319 0.909 0.473 0.904 0.477 C 0.899 0.481 0.756 0.424 0.749 0.424 C 0.743 0.424 0.599 0.481 0.594 0.477 C 0.589 0.473 0.599 0.319 0.597 0.313 C 0.595 0.307 0.496 0.188 0.498 0.182 C 0.5 0.176 0.65 0.138 0.655 0.134 C 0.66 0.13 0.743 0 0.749 0 Z "/>
                    
                            </clipPath>
                        </svg>
                    </div>                     
        </div>
        )
    }
}
export default SpellPuncRater;