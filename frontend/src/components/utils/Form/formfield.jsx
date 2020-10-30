import React from 'react';

const Formfield = ({formdata, change, id, is_disabled, style}) => {
// console.log("$$$$$$$$$$$$$$$$$$$$$$a$$$$$$$$$$$$$$$$$$$$$$$$$")
 
//    console.log('formdata FormFiled:')
//     console.log(formdata)
//     console.log('change FormFiled:')
//     console.log(change)
//     console.log('id FormFiled:')
//     console.log(id)

//     console.log('is_disabledFormFiled:')
//     console.log(is_disabled)
//     console.log("$$$$$$$$$$$$$$$$$$b$$$$$$$$$$$$$$$$$$$$$$$$$$$")

    const showError = () => {
        let errorMessage = null;

        if(formdata.validation && !formdata.valid){
            errorMessage = (
                <div className="error_label">
                    {formdata.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }


    const renderTemplate = () => {
        let formTemplate = null;

        switch(formdata.element){
            case('input'):
                //if(formdata.config.type==='text'){
                    formTemplate = (
                        <div className="formBlock">
                            { formdata.showlabel ? 
                                <div className="label_inputs">{formdata.config.label}</div>
                            :null}

                            <input
                                {...formdata.config}
                                value={formdata.value}
                                onBlur={(event)=> change({event,id,blur:true})}
                                onChange={(event)=> change({event,id}) }
                                disabled={is_disabled}
                                style={style}
                                

                            />
                            {showError()}
                        </div>
                
                    )
                //} else if (formdata.config.type==='date'){

               // }
            break;
            case('select'):
                formTemplate = (
                    <div className="formBlock">
                        { formdata.showlabel ? 
                            <div className="label_inputs">{formdata.config.label}</div>
                        :null}
                        <select
                            value={formdata.value}
                            onBlur={(event)=> change({event,id,blur:true})}
                            onChange={(event)=> change({event,id}) }
                        >
                            <option value="">Select one</option>
                            {
                                formdata.config.options.map(item=>(
                                    <option 
                                        key={item.key} 
                                        value={item.key}
                                    >
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                        {showError()}
                    </div>
                )
            break;
            case('textarea'):
            formTemplate = (
                <div className="formBlock">
                    { formdata.showlabel ? 
                        <div className="label_inputs">{formdata.config.label}</div>
                    :null}
                    <textarea
                        {...formdata.config}
                        value={formdata.value}
                        onBlur={(event)=> change({event,id,blur:true})}
                        onChange={(event)=> change({event,id}) }
                        style={style}
                        
                    />
                    {showError()}
                </div>
            )
            break;
            case('date'):
            formTemplate = (
                <div className="formBlock">
                    { formdata.showlabel ? 
                        <div className="label_inputs">{formdata.config.label}</div>
                    :null}
                    <date
                        {...formdata.config}
                        value={formdata.value}
                        onBlur={(event)=> change({event,id,blur:true})}
                        onChange={(event)=> change({event,id}) }
                    />
                    {showError()}
                </div>
            )
            break;
            default:
                formTemplate = null;
        }

        return formTemplate;
    }


    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default Formfield;