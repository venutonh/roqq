import React, { Component } from 'react';
import PageTop from '../utils/page_top';

import FormField from '../utils/Form/formfield';
import DisplayGrid from './display_grid';
import CollapseCheck from '../utils/Form/collapse_check';
import CollapseRadio from '../utils/Form/collapse_radio';
import { update, filterTheData } from '../utils/Form/formActions';
import { timeline, orderT, optionsT, organized} from '../utils/fixed_categories';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getArticlesByAuthor } from '../../actions/author_actions';
import { getAuthorsAndNetworks, getArticlesByNetwork } from '../../actions/network_actions';
import { getCollapseResults } from '../../actions/collapse_actions';

import './main_display.css';



class MainDisplay extends Component {

    state = {
        grid:'',
        limit:6,
        skip:0,
        formError: false,
        formSuccuss: '',
        is_disabled:true,
        formdata:{
            date_a: {
                element: 'input',
                value: '',
                config: {
                    name: 'date_a',
                    type: 'date',
                   // placeholders: 'mm/dd/yy'
                },
                validation:{
                    required: false
                },
                valid: true,
                touched: false,
                valdationMessage:''
            },
            date_b: {
                element: 'input',
                value: '',
                config: {
                    name: 'date_b',
                    type: 'date',
                    //placeholders: 'mm/dd/yy'
                },
                validation:{
                    required: false
                },
                valid: false,
                touched: false,
                valdationMessage:''
            }
        },
        filters:{
            dates:"",
            order:[],
            topics:[]
        }
    }



    // componentDidMount(){
    //      this.props.dispatch(getArticlesByAuthor());
    //      this.props.dispatch(getAuthorsAndNetworks());
    //      this.props.dispatch(getArticlesByNetwork());
    // }




     updateForm (element) {
        const newFormdata = update(element,this.state.formdata,'date_a');
        this.setState({
                formError: false,
                formdata: newFormdata
        })
        
    }





    secondaryInput =()=>{
        return (
            <div className="secondary_input">
                <FormField
                id={'date_a'}
                formdata={this.state.formdata.date_a}
                change={(element)=> this.updateForm(element)}
                is_disabled={this.state.is_disabled}
                />
                to
                <FormField
                id={'date_b'}
                formdata={this.state.formdata.date_b}
                change={(element)=> this.updateForm(element)}
                is_disabled={this.state.is_disabled}
                />
            </div>
        )
    }

    
    


    handleFilters = (filters,category) => {
        const newFilters = {...this.state.filters}
        newFilters[category] = filters;
        

         if(category === "order"){
              let orderValues = this.handleOrder(filters);
              newFilters[category] = orderValues
         }
         if(category === "dates" && filters=== "2"){
            this.setState({
                filters: newFilters,
                is_disabled:false
            })
         }
         if((category === "dates" && filters=== "0") || (category === "dates" && filters=== "1")){
           this.setState({
               filters: newFilters,
               is_disabled:true
           })
        }
        // this.showFilteredResults(newFilters)
        this.setState({
            filters: newFilters 
        })
    }




    handleOrder = (value) => {
        console.log("inside handleOrder")
        const data = orderT;
        let array = [];

        console.log('value:')
        console.log(value)

        for(let key in data){
            if(data[key].id === parseInt(value,10)){
                array = data[key].array
            }
        }
        
        return array;
    }




    submitForm = (event) =>{
        event.preventDefault();
        let filterData=this.state.filters;
        let theFormData=this.state.formdata;
        let seperatedData=filterTheData(filterData, theFormData);
        this.props.dispatch(getCollapseResults(seperatedData));
    }


    // showFilteredResults = (filters) =>{
    //     this.props.dispatch(getProductsToShop(
    //         0,
    //         this.state.limit,
    //         filters
    //     )).then(()=>{
    //         this.setState({
    //             skip:0
    //         })
    //     })
    // }


    render() {

        return (
            <div  className="container">
                <div className="article_search">
                    <PageTop
                        title="Front Page"
                    />

                </div>
                
                <div className="left_container">
                    <div className="search_wrapper">
                        <div className="left">
                            <form onSubmit={(event)=> this.submitForm(event)}>
                                <CollapseRadio
                                    initState={true}
                                    title="Dates"
                                    list={timeline}
                                    handleFilters={(filters)=> this.handleFilters(filters,'dates')}
                                    secondary={this.secondaryInput()}
                                    secIdentifier="inputTextBox"
                                    //sendDispatch={false}
                                />
                                <CollapseCheck
                                    initState={false}
                                    title="Organize By:"
                                    list={organized}
                                    handleFilters={(filters)=> this.handleFilters(filters,'topics')}
                                    //sendDispatch={true}
                                />
                                <CollapseRadio
                                    initState={false}
                                    title="Order"
                                    list={orderT}
                                    handleFilters={(filters)=> this.handleFilters(filters,'order')}
                                    //sendDispatch={true}
                                />
                            
                            </form>
                            <button onClick={(event)=>this.submitForm(event)}>
                                Apply
                            </button>
                        </div>    
                    </div>
                </div>    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user:    state.user,
        // allAuthorsByNetworks:state.prop,
        // allArticlesByNetwork:state.prop,
        // allArticlesByAuthor:state.prop,
        getCollapseResults:state.prop
    }
}


export default connect(mapStateToProps)(withRouter(MainDisplay));