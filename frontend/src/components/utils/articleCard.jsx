import React, { Component } from 'react'

class ArticleCard extends Component {


    // renderCardImage(images){
    //     if(images.length>0){
    //         return images[0].url
    //     } else { 
    //         return '/images/image_not_available.png'
        
    //     }
    // }
    




    render() {
        const props = this.props;
        return (
            <div className={`article_card_wrapper ${props.grid}`}>
                <div 
                    className="image_container"
                    // style={{
                    //     background=`url(${this.renderCardImage(props.images)}) no-repeat`
                    // }}
                >
                <div className="card_container">

                    <div className="info_container">
                        <div className="title">{props.title}</div>
                        <div className="author">{props.author}</div>
                        <div className="link">{props.link}</div>

                    </div>
                    
                    
                </div>


                </div>
                { props. grid ?
                    <div className="description">
                        FUCK you fuck YOU FUCK you fuck YOU
                    </div>
                    :null
                }
                {/* <div className="actions">
                    <div className="button_wrap">
                        <MyButton
                            type="default"
                            //altClass="card_link"
                            title="Check Article Reviews"
                            linkTo={`/product_detail/${props.id}`}
                            addStyles={{
                                margin: '10px 0 0 0'
                            }}
                        />
                    </div>

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! bag_link is suppose to be added as a 'case' in MyButton. Check 6:31 in Finishing Home Cards !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                    <div className="button_wrap">
                        <MyButton
                            type="bag_link"
                            runAction={()=>{
                                console.log('added to cart fuckface douchebag')
                            }}
                        
                        />
                    </div>
                </div> */}

                
            </div>
        )
    }
}

export default ArticleCard;