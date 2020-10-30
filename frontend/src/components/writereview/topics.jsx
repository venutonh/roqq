import React, { Component } from 'react'

import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { supportUrlObject } from '../utils/misc';


class Topics extends Component {
    state= {
        topics_list: {
            element: 'text',
            value: '',
            topics_key:'',
            config: {
                name: 'topics_list',
                type: 'text',
                placeholder: 'Enter topics here'
            },
            validation:{
                required: false
            },
            valid: false,
            touched: false,
            valdationMessage:''
        }
    }
        
  
    render() {
    const {topics, deleteTopic, linkLength} = this.props;
   
    const topicsList = topics.map(item =>
        {
            return <div className='topic_item' list_key={item.list_key}>
                {/* {console.log('item.value: '+item.link_url)} */}
                
                <div>
                        {item.topic_name}
                        
                    
                    <div>
                        <button onClick={()=>deleteTopic(item.list_key)}>
                            Remove
                        </button>
                    </div>
                </div>


            </div>
        })

        return (
            <div>
                    {topicsList}
            </div>
        )
    }
}
export default Topics;