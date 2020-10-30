import React, { Component } from 'react';

import './basicInfo.css';

class titleUrlAuthor extends Component {
    render() {
      
        const {article} = this.props;

        const title=article ? article.title : null;
        const author=article ? article.author : null;
        const mainUrl = article ? article.articleMainUrl : null;
        const articleUrl = article ? article.articleUrl : null;
        const datePosted = article ? article.datePosted : null;

        const url = mainUrl+articleUrl;
        return (
            <div className='title_author_url_wrapper'>
                <div className='title'>
                    "{title}"
                </div>
                <div className='author'>
                    By: {author}
                </div>
                <div className='date_published'>
                    {datePosted}
                </div>
                <div className='url'>
                    {url}
                </div>
            </div>
        )
    }

}
export default titleUrlAuthor;
