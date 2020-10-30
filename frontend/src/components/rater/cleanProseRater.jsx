import React, { Component } from 'react';
import styled from 'styled-components';

    


    const Styles = styled.div`
    
        .slider {
        
        -webkit-appearance: none;
        outline: none;
        position:relative;
        width: 90px;
        height: 90px;
        overflow: hidden;
        clip-path: url(#agope);

        ::-webkit-slider-runnable-track {
            background: #ddd;
        }        
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 0px; 
            height: 90px;
            box-shadow: -90px 0 0 90px dodgerblue;
        }
    `;
    

    const StylesB = styled.div`

   

    // .hide_svg_sp{
         
    //      display:none

    //  }

    //  `;



class CleanProseRater extends Component {


    render() {
        
        const {value, onInputChange} = this.props;
        const val = (this.props.value)/2;

        return (
            <div>
                

                <Styles>
                    <div className='rate_value'>
                    {/* {val} */}
                        <input
                            type='range'
                            className='slider'
                            min={0}
                            max={6}
                            value={value}
                            step={1}
                            onChange={onInputChange}


                        />
                        {/* <div className='range_marker'>
                            {val}
                        </div> */}
                    </div>
                </Styles>
                {/* <StylesB> */}
                <div className="hide_svg_sp" >
                    <svg  height="0" width="0">
                        <clipPath id="agope" clipPathUnits="objectBoundingBox">

                        <path d=" M 0.167 0 C 0.172 0 0.227 0.087 0.23 0.09 C 0.234 0.092 0.333 0.117 0.335 0.122 C 0.336 0.126 0.27 0.205 0.269 0.209 C 0.268 0.213 0.274 0.316 0.271 0.318 C 0.267 0.321 0.172 0.283 0.167 0.283 C 0.163 0.283 0.067 0.321 0.064 0.318 C 0.06 0.316 0.067 0.213 0.066 0.209 C 0.065 0.205 -0.001 0.126 0 0.122 C 0.001 0.117 0.101 0.092 0.105 0.09 C 0.108 0.087 0.163 0 0.167 0 Z "/>
                        <path d=" M 0.5 0 C 0.504 0 0.559 0.087 0.563 0.09 C 0.566 0.092 0.666 0.117 0.667 0.122 C 0.669 0.126 0.603 0.205 0.601 0.209 C 0.6 0.213 0.607 0.316 0.603 0.318 C 0.6 0.321 0.504 0.283 0.5 0.283 C 0.496 0.283 0.4 0.321 0.397 0.318 C 0.393 0.316 0.4 0.213 0.399 0.209 C 0.397 0.205 0.331 0.126 0.333 0.122 C 0.334 0.117 0.434 0.092 0.437 0.09 C 0.441 0.087 0.496 0 0.5 0 Z "/>
                        <path d=" M 0.833 0 C 0.837 0 0.892 0.087 0.895 0.09 C 0.899 0.092 0.999 0.117 1 0.122 C 1.000 0.126 0.935 0.205 0.934 0.209 C 0.933 0.213 0.94 0.316 0.936 0.318 C 0.933 0.321 0.837 0.283 0.833 0.283 C 0.828 0.283 0.733 0.321 0.729 0.318 C 0.726 0.316 0.732 0.213 0.731 0.209 C 0.73 0.205 0.664 0.126 0.665 0.122 C 0.667 0.117 0.766 0.092 0.77 0.09 C 0.773 0.087 0.828 0 0.833 0 L 0.833 0 Z "/>         
                        </clipPath>
                    </svg>

                </div>
                
                {/* </StylesB> */}
        </div>
        )
    }
}
export default CleanProseRater;