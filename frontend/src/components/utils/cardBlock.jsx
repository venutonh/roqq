import React from 'react';
import ArticleCard from './articleCard';

const CardBlock = (props) => {

    const renderCard = () =>(
        props.list ?
            props.list.map((card,i)=>(
                <div>

                    <ArticleCard
                        key={i}
                        {...card}
                    />
                </div>
                
            ))

        :null
    )
    
    return (
        <div className="card_block">
            <div className="container">
                {
                    props.title ? 
                        <div className="article_title">
                            {props.title}
                        </div>
                    :null
                }
                { renderCards(props.list) }
            </div>
        </div>
    )
    
}

export default CardBlock;