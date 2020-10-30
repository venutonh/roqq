import React, { Component } from 'react';
import styled from 'styled-components';




    const Styles = styled.div`


        .slider {

        -webkit-appearance: none;
        outline: none;
        position:relative;
        width: 120px;
        height: 120px;
        overflow: hidden;
        clip-path: url(#gope);

        ::-webkit-slider-runnable-track {
            background: #ddd;
        }
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 0px;
            height: 120px;
            box-shadow: -120px 0 0 120px dodgerblue;
        }

    `;

    // const StylesB = styled.div`

   

    // .hide_svg_sp{
    //      top:100%;
    //      display:none

    // }

    // `;



class Drater extends Component {

    render() {
        const {value, onInputChange} = this.props;
        const val = (this.props.value)/2;

        return (
            <div>
                <Styles>

                    <input
                        type='range'
                        className='slider'
                        min={0}
                        max={8}
                        value={value}
                        step={1}
                        onChange={onInputChange}
                    />

                    {/* <div className='range_marker'>
                        {val}
                    </div> */}
                </Styles>
                {/* <StylesB> */}

                    <div className="hide_svg_sp">
                        <svg height="0" width="0">
                            <clipPath id="gope" clipPathUnits="objectBoundingBox" height="0" width="0">

                                <path d=" M 0.126 0.38 C 0.129 0.38 0.17 0.446 0.173 0.448 C 0.175 0.45 0.25 0.469 0.251 0.472 C 0.252 0.475 0.203 0.534 0.202 0.537 C 0.201 0.54 0.206 0.617 0.203 0.619 C 0.201 0.621 0.129 0.593 0.126 0.593 C 0.122 0.593 0.051 0.621 0.048 0.619 C 0.045 0.617 0.05 0.54 0.049 0.537 C 0.048 0.534 -0.001 0.475 0 0.472 C 0.001 0.469 0.076 0.45 0.079 0.448 C 0.081 0.446 0.122 0.38 0.126 0.38 Z" />
                                <path d=" M 0.375 0.38 C 0.378 0.38 0.42 0.446 0.422 0.448 C 0.425 0.45 0.5 0.469 0.501 0.472 C 0.502 0.475 0.452 0.534 0.451 0.537 C 0.45 0.54 0.455 0.617 0.453 0.619 C 0.45 0.621 0.378 0.593 0.375 0.593 C 0.372 0.593 0.3 0.621 0.298 0.619 C 0.295 0.617 0.3 0.54 0.299 0.537 C 0.298 0.534 0.249 0.475 0.25 0.472 C 0.251 0.469 0.325 0.45 0.328 0.448 C 0.331 0.446 0.372 0.38 0.375 0.38 Z " />
                                <path d=" M 0.625 0.38 C 0.628 0.38 0.669 0.446 0.672 0.448 C 0.675 0.45 0.749 0.469 0.75 0.472 C 0.751 0.475 0.702 0.534 0.701 0.537 C 0.7 0.54 0.705 0.617 0.702 0.619 C 0.7 0.621 0.628 0.593 0.625 0.593 C 0.622 0.593 0.55 0.621 0.547 0.619 C 0.545 0.617 0.55 0.54 0.549 0.537 C 0.548 0.534 0.498 0.475 0.499 0.472 C 0.5 0.469 0.575 0.45 0.578 0.448 C 0.58 0.446 0.622 0.38 0.625 0.38 L 0.625 0.38 Z " />
                                <path d=" M 0.874 0.38 C 0.878 0.38 0.919 0.446 0.921 0.448 C 0.924 0.45 0.999 0.469 1 0.472 C 1.001 0.475 0.952 0.534 0.951 0.537 C 0.95 0.54 0.955 0.617 0.952 0.619 C 0.949 0.621 0.878 0.593 0.874 0.593 C 0.871 0.593 0.799 0.621 0.797 0.619 C 0.794 0.617 0.799 0.54 0.798 0.537 C 0.797 0.534 0.748 0.475 0.749 0.472 C 0.75 0.469 0.825 0.45 0.827 0.448 C 0.83 0.446 0.871 0.38 0.874 0.38 L 0.874 0.38 Z"/>


                            </clipPath>
                        </svg>
                    </div>
                {/* </StylesB> */}
        </div>
        )
    }
}
export default Drater;