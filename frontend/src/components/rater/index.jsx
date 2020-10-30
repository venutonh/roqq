import React, { Component } from 'react';

import Drater from './dRater';
import CleanProseRater from './cleanProseRater';
import SpellPuncRater from './spellPuncRater';
import LikeItRater from './likeItRater';

import './rater.css';

class index extends Component {
    render() {
        const {draterValue, cleanProseValue, spellPunctValue, likeItVelue,dInputChange,cpInputChange,spInputChange,likeInputChange} = this.props;
        return (
            <div>
                <div className='raters'>
                    <div className='details'>
                        <div className='details_title'>Details</div>
                        <div className="drater">
                            <Drater          value=  {draterValue} onInputChange={dInputChange}/>
                        </div>
                    </div>
                        <div className="clean_prose">
                        <div className='clean_prose_title'>Clean Prose</div>
                        <div className="cleanprose_rater">
                            <CleanProseRater value=  {cleanProseValue} onInputChange={cpInputChange}/>
                        </div>
                    </div>
                    <div className="spell_gram">
                        <div className='spell_gram_title'>Spelling/Gram </div>
                        <div className="sp_rater">
                            <SpellPuncRater  value=  {spellPunctValue} onInputChange={spInputChange}/>
                        </div>
                    </div>
                    <div className="like_it">
                        <div className='like_it_title'>Did You Like It?</div>
                        <div className="likeit_rater">
                            <LikeItRater     value=  {likeItVelue} onInputChange={likeInputChange}/>
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
}

export default index;