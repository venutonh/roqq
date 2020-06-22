import React, { Component } from 'react';

class Rater extends Component {

    state={
        
        data:{
            rater: {
                element: 'input',
                value: 0,
                config: {
                    name: 'rate_input',
                    type: 'range',
                    placeholders: ''
                },
                hover: false,
                touched: false
            }
        }
    };


    update = (element, formdata, formName ) => {
        const newFormdata = {
            ...formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }
    
        newElement.value = element.event.target.value;
    
        if(element.blur){
            let validData = validate(newElement,formdata);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
    
        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;
    
        return newFormdata;
    }
    



    updateSlider = (element) => {
        const newData=update
        this.setState({
            data: newData
        })
    }




    render() {
        const val = this.state.value;

        return (
            <div>
                <div>
                    {val}
                </div>
                <input
                    type='range'
                    className='slider'
                    min='0'
                    max='10'
                    step='2'
                    onInput={this.state.value}

                />
            </div>
        )
    }
}
export default Rater;