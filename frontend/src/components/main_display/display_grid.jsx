import React, { Component } from 'react';
import ArticleCard from '../utils/articleCard';

const DisplayGrid = (props) => {


    const articleList = this.props.articles.map(item=>
        {
            return <div className='article_grid' link_key={item.link_key}>

                <div>
                    {item.title}
                    {item.author}
                    {item.link_url}

                    <div>
                            {/* <button onClick={()=>deleteLink(item.link_key)}>
                                Click this shit fuckeface
                            </button> */}
                    </div>
                </div>
                

            </div>
    })


    
        return (
            <div>
                
            </div>
        )
    
}
export default DisplayGrid;