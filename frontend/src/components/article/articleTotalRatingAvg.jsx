import React, { Component } from 'react'
import styled from 'styled-components';

// position:relative;
// overflow: hidden;
    
    const Styles = styled.div`
        .total_slider_value {
            
            margin:auto;

            -webkit-appearance: none;
            outline: none;
           
            width: 300px;
            height: 300px;

            
            
            clip-path: url(#total_rating);

            ::-webkit-slider-runnable-track {
                background: #ddd;
            }
            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 0px;
                height: 200px;
                box-shadow: -300px 0 0 300px dodgerblue;
            }

        `;


class ArticleTotalRatingAvg extends Component {

    render() {
        const {avgTotal, avgDetail, avgCp, avgSg} = this.props;

        return (

            <div>
              <Styles>
                <input
                    type='range'
                    className='total_slider_value'
                    min={0.00}
                    max={20.00}
                    value={avgTotal ?
                            avgTotal
                           :null
                    }
                    step={0.001}
                
                />
              </Styles>
                <svg> 
                    <clipPath id="total_rating" clipPathUnits="objectBoundingBox">
                                                 
                        <path d=" M 0.35 0 C 0.351 0 0.368 0.026 0.369 0.027 C 0.37 0.028 0.4 0.035 0.4 0.037 C 0.401 0.038 0.381 0.062 0.381 0.063 C 0.38 0.064 0.382 0.095 0.381 0.096 C 0.38 0.096 0.351 0.085 0.35 0.085 C 0.349 0.085 0.32 0.096 0.319 0.096 C 0.318 0.095 0.32 0.064 0.32 0.063 C 0.319 0.062 0.299 0.038 0.3 0.037 C 0.3 0.035 0.33 0.028 0.331 0.027 C 0.332 0.026 0.349 0 0.35 0 L 0.35 0 Z "/>
                            
                        <path d=" M 0.45 0 C 0.451 0 0.468 0.026 0.469 0.027 C 0.47 0.028 0.5 0.035 0.5 0.037 C 0.501 0.038 0.481 0.062 0.481 0.063 C 0.48 0.064 0.482 0.095 0.481 0.096 C 0.48 0.096 0.451 0.085 0.45 0.085 C 0.449 0.085 0.42 0.096 0.419 0.096 C 0.418 0.095 0.42 0.064 0.42 0.063 C 0.419 0.062 0.399 0.038 0.4 0.037 C 0.4 0.035 0.43 0.028 0.431 0.027 C 0.432 0.026 0.449 0 0.45 0 Z "/>
                        <path d=" M 0.55 0 C 0.551 0 0.568 0.026 0.569 0.027 C 0.57 0.028 0.6 0.035 0.6 0.037 C 0.601 0.038 0.581 0.062 0.581 0.063 C 0.58 0.064 0.582 0.095 0.581 0.096 C 0.58 0.096 0.551 0.085 0.55 0.085 C 0.549 0.085 0.52 0.096 0.519 0.096 C 0.518 0.095 0.52 0.064 0.52 0.063 C 0.519 0.062 0.499 0.038 0.5 0.037 C 0.5 0.035 0.53 0.028 0.531 0.027 C 0.532 0.026 0.549 0 0.55 0 Z "/>
                        <path d=" M 0.65 0 C 0.651 0 0.668 0.026 0.669 0.027 C 0.67 0.028 0.7 0.035 0.7 0.037 C 0.701 0.038 0.681 0.062 0.68 0.063 C 0.68 0.064 0.682 0.095 0.681 0.096 C 0.68 0.096 0.651 0.085 0.65 0.085 C 0.649 0.085 0.62 0.096 0.619 0.096 C 0.618 0.095 0.62 0.064 0.619 0.063 C 0.619 0.062 0.599 0.038 0.6 0.037 C 0.6 0.035 0.63 0.028 0.631 0.027 C 0.632 0.026 0.649 0 0.65 0 L 0.65 0 Z "/>
                        
                        <path d=" M 0.95 0 C 0.951 0 0.967 0.026 0.969 0.027 C 0.97 0.028 1 0.035 1 0.037 C 1 0.038 0.981 0.062 0.98 0.063 C 0.98 0.064 0.982 0.095 0.981 0.096 C 0.98 0.096 0.951 0.085 0.95 0.085 C 0.948 0.085 0.92 0.096 0.919 0.096 C 0.918 0.095 0.92 0.064 0.919 0.063 C 0.919 0.062 0.899 0.038 0.899 0.037 C 0.9 0.035 0.93 0.028 0.931 0.027 C 0.932 0.026 0.948 0 0.95 0 L 0.95 0 Z "/>
                        <path d=" M 0.85 0 C 0.851 0 0.868 0.026 0.869 0.027 C 0.87 0.028 0.9 0.035 0.9 0.037 C 0.9 0.038 0.881 0.062 0.88 0.063 C 0.88 0.064 0.882 0.095 0.881 0.096 C 0.88 0.096 0.851 0.085 0.85 0.085 C 0.848 0.085 0.82 0.096 0.819 0.096 C 0.818 0.095 0.82 0.064 0.819 0.063 C 0.819 0.062 0.799 0.038 0.799 0.037 C 0.8 0.035 0.83 0.028 0.831 0.027 C 0.832 0.026 0.848 0 0.85 0 L 0.85 0 Z "/>

                        <path d=" M 0.75 0 C 0.751 0 0.768 0.026 0.769 0.027 C 0.77 0.028 0.8 0.035 0.8 0.037 C 0.801 0.038 0.781 0.062 0.78 0.063 C 0.78 0.064 0.782 0.095 0.781 0.096 C 0.78 0.096 0.751 0.085 0.75 0.085 C 0.749 0.085 0.72 0.096 0.719 0.096 C 0.718 0.095 0.72 0.064 0.719 0.063 C 0.719 0.062 0.699 0.038 0.7 0.037 C 0.7 0.035 0.73 0.028 0.731 0.027 C 0.732 0.026 0.749 0 0.75 0 L 0.75 0 Z "/>
                        
                        <path d=" M 0.05 0 C 0.052 0 0.068 0.026 0.069 0.027 C 0.07 0.028 0.1 0.035 0.101 0.037 C 0.101 0.038 0.081 0.062 0.081 0.063 C 0.08 0.064 0.082 0.095 0.081 0.096 C 0.08 0.096 0.052 0.085 0.05 0.085 C 0.049 0.085 0.02 0.096 0.019 0.096 C 0.018 0.095 0.02 0.064 0.02 0.063 C 0.019 0.062 0 0.038 0 0.037 C 0 0.035 0.03 0.028 0.031 0.027 C 0.033 0.026 0.049 0 0.05 0 L 0.05 0 Z "/>
                        <path d=" M 0.15 0 C 0.152 0 0.168 0.026 0.169 0.027 C 0.17 0.028 0.2 0.035 0.201 0.037 C 0.201 0.038 0.181 0.062 0.181 0.063 C 0.18 0.064 0.182 0.095 0.181 0.096 C 0.18 0.096 0.152 0.085 0.15 0.085 C 0.149 0.085 0.12 0.096 0.119 0.096 C 0.118 0.095 0.12 0.064 0.12 0.063 C 0.119 0.062 0.1 0.038 0.1 0.037 C 0.1 0.035 0.13 0.028 0.131 0.027 C 0.132 0.026 0.149 0 0.15 0 L 0.15 0 Z "/>
                        <path d=" M 0.25 0 C 0.251 0 0.268 0.026 0.269 0.027 C 0.27 0.028 0.3 0.035 0.3 0.037 C 0.301 0.038 0.281 0.062 0.281 0.063 C 0.28 0.064 0.282 0.095 0.281 0.096 C 0.28 0.096 0.251 0.085 0.25 0.085 C 0.249 0.085 0.22 0.096 0.219 0.096 C 0.218 0.095 0.22 0.064 0.22 0.063 C 0.219 0.062 0.199 0.038 0.2 0.037 C 0.2 0.035 0.23 0.028 0.231 0.027 C 0.232 0.026 0.249 0 0.25 0 L 0.25 0 Z "/>
                        

                    </clipPath>
                </svg>
            </div>

        )
    }
}

export default ArticleTotalRatingAvg;