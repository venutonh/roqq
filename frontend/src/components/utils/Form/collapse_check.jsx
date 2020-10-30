import React, { Component } from 'react';

import { 
    ListGroup, 
    ListGroupItem, 
    Collapse, 
    ListGroupItemText,
    CustomInput, 
    Label } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  faAngleDown  from '@fortawesome/fontawesome-free-solid/faAngleDown';
import  faAngleUp  from '@fortawesome/fontawesome-free-solid/faAngleUp';


class CollapseCheck extends Component {

    state = {
        open: false,
        checked: []
    }


    componentDidMount(){
        if(this.props.initState){
            this.setState({
                open:this.props.initState
            })
        }
    }



    handleOpen = () => {this.setState({open: !this.state.open})}



    handleArrow = () => (
        
            <FontAwesomeIcon
                icon={this.state.open ?  faAngleUp : faAngleDown}
                className="icon"
            />
    )

    renderList = () => (
        this.props.list ?
            this.props.list.map((value)=> (
                <ListGroupItem key={`${value.name}_${value.id}`}>
                    
                        <CustomInput 
                            type="checkbox" 
                            //color="green"
                            id={`${value.name}_${value.id}`} 
                            label={value.name}
                            inline
                            onChange={this.handleToggle(value.id)}
                            checked={this.state.checked.indexOf(value.id) !== -1}
                        />
                </ListGroupItem>
                
        
            ))
        :null
    )

    handleToggle = value => () => {
        const checked = this.state.checked;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if(currentIndex ===-1){
            newChecked.push(value)
            
        } else{
            newChecked.splice(currentIndex, 1)
        }

        console.log(newChecked)
        
        this.setState({
            checked: newChecked
         },()=>{
             this.props.handleFilters(newChecked)
         })
    }



    render() {
        
        return (
            <div className="collapse_items_wrapper">
                <ListGroup>
                    <ListGroupItem onClick={this.handleOpen}>
                        <ListGroupItemText className="collapse_title">
                            {this.props.title}
                            <div className="arrow">
                                {this.handleArrow()}
                            </div>
                        </ListGroupItemText> 
                            
                    </ListGroupItem>


                    <Collapse isOpen={this.state.open}>
                         <ListGroup> 
                            {this.renderList()}
                         </ListGroup>
                        
                    </Collapse>
                
            </ListGroup>
            
            </div>
           
        );
    }
}
export default CollapseCheck;
