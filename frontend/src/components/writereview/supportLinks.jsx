import React, { Component } from 'react'

import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { supportUrlObject } from '../utils/misc';


class SupportLinks extends Component {
    render() {
    const {supportLinks, deleteLink, linkLength} = this.props;
   
    const listLinks = supportLinks.map(item =>
        {
            return <div className='link_item' link_key={item.link_key}>
                {/* {console.log('item.value: '+item.link_url)} */}
                
                <div>
                        <li>
                            <a href={item.link_url} target="_blank">{item.link_url}</a>
                        </li>
                    
                    <div>
                        <button onClick={()=>deleteLink(item.link_key)}>
                            Remove
                        </button>
                    </div>
                </div>


            </div>
        })

        return (
            <div>
                <ol type="i">
            
                    {listLinks}
                </ol>
            </div>
        )
    }
}


export default SupportLinks;