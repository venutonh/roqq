import React, { Component } from 'react';
import TitleUrlAuthor from './titleUrlAuthor';
import Drater from '../rater/dRater';
import CleanProseRater from '../rater/cleanProseRater';
import SpellPuncRater from '../rater/spellPuncRater';
import LikeItRater from '../rater/likeItRater';
import Rater from '../rater';
import SupportLinks from './supportLinks';
import Topics from './topics';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { reviewArticle } from '../../actions/article_actions';
import { checkEligibility, generateReviewData, supportUrlObject } from '../utils/misc';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getArticleStats } from '../../actions/article_actions';
import Vote from '../vote';
import './writereview.css';


class WriteReview extends Component {

    state={
        userId:0,
        articleId:0,
        dValue:0,
        cpValue:0,
        spValue:0,
        likeValue:0,
        totalValue:0,
        supportLinks:[],
        jsonSupportLinks:[],
        formError: false,
        formSuccuss: '',
        formdata:{
            review: {
                element: 'textarea',
                value: '',
                config: {
                    name: 'review',
                    type: 'text',
                    placeholder: 'Write review here'
                },
                validation:{
                    required:false
                },
                valid: true,
                touched: false,
                valdationMessage:''
            },
            support_links: {
                element: 'input',
                value: '',
                link_key:'',
                config: {
                    name: 'support_links',
                    type: 'text',
                    placeholder: 'Enter link here'
                },
                validation:{
                    required: false,
                    url: true
                },
                valid: true,
                touched: false,
                valdationMessage:''
            },
            topic_list: {
                element: 'input',
                value: '',
                link_key:'',
                config: {
                    name: 'topic_list',
                    type: 'text',
                    placeholder: 'Enter topics here'
                },
                validation:{
                    required: false,
                },
                valid: true,
                touched: false,
                valdationMessage:''
            },
            
            
        }
    }


    componentDidMount() {
        this.setState({
            userId:(this.props.user.userData.userId),
            articleId:(this.props.article.urlData.article_id),
            dValue:0,
            cpValue:0,
            spValue:0,
            likeValue:0,
            totalValue:0
        })
    }

    handleChange = (newValue,element) => {
        const newData=element.target.value;
        switch(newValue){
            case('dValue'):
                const oldD = this.state.dValue;
                this.setState({
                    dValue: newData,
                    totalValue: (newData-oldD)+this.state.totalValue
               });
            break;
            case('cpValue'):
               const oldCp = this.state.cpValue;
                this.setState({
                    cpValue: newData,
                    totalValue:(newData-oldCp)+this.state.totalValue
                });
            break;
            case('spValue'):
                const oldSp = this.state.spValue;
                this.setState({
                    spValue: newData,
                    totalValue:(newData-oldSp)+this.state.totalValue
                });
            break;
            case('likeValue'):
                const oldLike = this.state.likeValue;
                this.setState({
                    likeValue: newData,
                    totalValue:(newData-oldLike)+this.state.totalValue
                });
            break;

        }
    }



    addLink = (event) => {
        event.preventDefault();
        
        let formIsValid = isFormValid(this.state.formdata,'url_scanner');
    
        //console.log('state value: ' + this.state.formdata.support_links.value);
        if(this.state.formdata.support_links.value !== '' && formIsValid
        ){

            const oldList = this.state.supportLinks;
            const jsonOldList = this.state.jsonSupportLinks;
            const resetFormData = this.state.formdata;

            const link_url =  this.state.formdata.support_links.value;
            const link_key = this.state.formdata.support_links.link_key;
            const article_id = this.props.article.urlData.article_id;
            const account_id = this.props.user.userData.userId;

            //const newUrlObject = new supportUrlObject(link_url, link_key, article_id, account_id);

            const newUrlObject={
                link_url:link_url,
                link_key:link_key,
                article_id:article_id,
                account_id:account_id
            }

            const newList = oldList.concat([
                newUrlObject
                ]);
            
            const jsonNewList = jsonOldList.concat([JSON.stringify(newUrlObject)]);
            

                resetFormData.support_links.value = '';
                resetFormData.support_links.link_key = '';

                    this.setState({
                        supportLinks: newList,
                        jsonSupportLinks: jsonNewList,
                        support_links:  resetFormData
                    });
        };

       
           
    }

    deleteLink=(link_key)=>{
        const filteredLinks = this.state.supportLinks.filter(item=>
            item.link_key!==link_key);
            this.setState({
                supportLinks: filteredLinks
            })
    }


    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'url_scanner');
        newFormdata.support_links.link_key = String(Date.now());
        this.setState({
            formError: false,
            formdata: newFormdata,
        })
    }



    submitForm= (event) =>{
        event.preventDefault();    
        const id = this.props.article.urlData.article_id;
        let dataToSubmit = generateReviewData(this.state);
        
        //let formIsValid = isFormValid(this.state.formdata,'review');
        //console.log(dataToSubmit);
    
        //if(formIsValid ){
            //console.log("form is valid dip shit!")
            //console.log(dataToSubmit);
            this.props.dispatch(reviewArticle(dataToSubmit)).then(response =>{
                if(response.payload.reviewSuccess){
                    //this.props.dispatch(getArticleStats({articleId:id})).then(response =>{
                        //if(!response){
                            this.props.history.push(`/article/review/${id}`);
                            //console.log("Sorry, there was an error loading this page");
                            //this.props.history.push('/');
                        //} else {
                        //    console.log("Sorry, there was an error loading this page");
                        //    this.props.history.push('/');
                        //}
                        //});
                    
                    
                }else{
                    this.setState({
                        formError: true
                    })
            }
            });
         //} else {
         //    this.setState({
          //       formError: true
         //    })
       // }
    }


    render() {
        console.log('###################################')
        console.log('this.state.supportLinks:')
        console.log(this.state.supportLinks)
        //console.log('this.state.supportLinks[0].link_url:')
        //console.log(this.state.supportLinks[0].link_url?this.state.supportLinks[0].link_url:'')
        console.log('formdata.supportLinks.some(el=>el.link_url===element.value.trim()):')
        console.log(this.state.formdata.supportLinks ? this.state.formdata.supportLinks.some(el=>el.link_url===this.state.element.value.trim()):'');
        console.log('###################################')
       
        return (

            <div className="write_review_wrapper">

                
                <div className="write_page_header">
                    Write a review for:
                </div>    
                <div className="write_basic_info">
                    <TitleUrlAuthor  article={this.props.article.urlData}/>
                </div>
                <div className='write_rater'>
                        <Rater          
                            draterValue=     {this.state.dValue} 
                            cleanProseValue= {this.state.cpValue}
                            spellPunctValue= {this.state.spValue}
                            likeItVelue=     {this.state.likeValue}
                            dInputChange=   {(e)=>this.handleChange('dValue',e)}
                            cpInputChange=  {(e)=>this.handleChange('cpValue',e)}
                            spInputChange=  {(e)=>this.handleChange('spValue',e)}
                            likeInputChange={(e)=>this.handleChange('likeValue',e)}
                            /> 
                </div>
                <div className="write_total_value">
                        <div>
                            {this.state.totalValue}
                        </div>
                    </div>

               <div className="write_support_links">
                    <form onSubmit={(event)=> this.addLink(event)}>
                                    <FormField
                                        id={'support_links'}
                                        formdata={this.state.formdata.support_links}
                                        change={(element)=>this.updateForm(element)}
                                    />
                                    <button onClick={(event)=> this.addLink(event)}>
                                    Add Link
                                    </button>
                        </form>
                                <SupportLinks 
                                    supportLinks={this.state.supportLinks}
                                    deleteLink={(link_key)=>this.deleteLink(link_key)}
                                    linkLength={this.state.supportLinks.length}
                                />
                </div>

                <div className="write_write_here">
                    <form onSubmit={(event)=> this.submitForm(event)}>
                        <div>
                            <FormField
                                id={'review'}
                                formdata={this.state.formdata.review}
                                change={(element)=> this.updateForm(element)}
                                style={{'width':'25em',
                                        'height':'8em'}}
                            />
                        </div>
                        <button onClick={(event)=> this.submitForm(event)}>
                            Post Review
                            </button>
                    </form>
                </div>
                

            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        user:    state.user,
        article: state.article
    }
}

export default connect(mapStateToProps)(withRouter(WriteReview));

