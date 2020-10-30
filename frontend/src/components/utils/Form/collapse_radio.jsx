import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import { 
    ListGroup, 
    ListGroupItem, 
    Collapse, 
    ListGroupItemText,
    CustomInput, 
    Label } from 'reactstrap';


class CollapseRadio extends Component {

    state = {
        open: false,
        value:'-1'
    }


    componentDidMount(){
        if(this.props.initState){
            this.setState({
                open: this.props.initState
            })
        }
    }

    // handleSecondaryInput = () =>{
    //     this.props.secondary

    // }

    handleClick = () => {
        this.setState({open: !this.state.open})
    }


    handleArrow = () => (
        <FontAwesomeIcon
        icon={this.state.open ?  faAngleUp : faAngleDown}
        className="icon"
    />
    )


    renderSecondary = (identifier) =>{
        if(identifier===this.props.secIdentifier){
           return this.props.secondary
        }else{
            return null
        }
    }


    handleChange = event => {
            this.props.handleFilters(event.target.value,"order")
            this.setState({value: event.target.value})
        }


    renderList = () => (
        this.props.list ?
            this.props.list.map( (inputValue) =>(
                
                <ListGroupItem key={`${inputValue.name}_${inputValue.id}`}>
                    <CustomInput
                        type="radio"
                        id={`${inputValue.name}_${inputValue.id}`}
                        label={inputValue.name}
                        //inline
                        onChange={this.handleChange}
                        value={inputValue.id}
                        checked={inputValue.id===Number(this.state.value) ? true : false}
                    />

                    {this.renderSecondary(inputValue.valueD)}

                </ListGroupItem>
            ))
        :null
    )


   


    render() {
        
        return (
            <div className="collapse_items_wrapper">
                 <ListGroup>
                    <ListGroupItem onClick={this.handleClick}>
                        <ListGroupItemText className="collapse_title">
                            {this.props.title} <div className="arrow">{this.handleArrow()}</div>
                            
                        </ListGroupItemText>   
                            
                    </ListGroupItem>


                    <Collapse isOpen={this.state.open}>
                        <ListGroup>
                                { this.renderList() }
                                
                        </ListGroup>

                    </Collapse>

                </ListGroup>
            </div>
        );
    }
}

export default CollapseRadio;