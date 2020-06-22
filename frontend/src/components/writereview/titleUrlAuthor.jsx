import React, { Component } from 'react';
import { connect} from 'react-redux';

class titleUrlAuthor extends Component {
    render() {
        const title= String(this.props.user.urlData.title);
        const author =String(this.props.user.urlData.author);

        const mainUrl = String(this.props.user.urlData.articleMainUrl);
        const articleUrl = String(this.props.user.urlData.articleUrl);
        const url = mainUrl+articleUrl;
        return (
            <div className='title_author_url_wrapper'>
                <div className='title'>
                    {title}
                </div>
                <div className='author'>
                    {author}
                </div>
                <div className='url'>
                    {url}
                </div>
                
            </div>
        )
    }

}

const mapStateToProps=(state)=>{
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(titleUrlAuthor);