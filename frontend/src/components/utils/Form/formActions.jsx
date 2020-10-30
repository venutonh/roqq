
import { getCurrentDate, getYesterdaysDate } from './../currentDate';


export const validate = (element, formdata= []) => {
    let error = [true,''];


    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value)
        const message = `${!valid ? 'Must be a valid email':''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.url && element.value !=''){
        const valid =
        /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
        .test(element.value)
        const message = `${!valid ? 'Must be a valid url':''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.confirm){
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? 'Passwords do not match':''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required':''}`;
        error = !valid ? [valid,message] : error;
    }

    
    return error
}








export const update = (element, formdata, formName ) => {

    const newFormdata = {
        ...formdata
    }
    const newElement = {
        ...newFormdata[element.id]
    }

    newElement.value = element.event.target.value;

    if(element.blur){
        let validData = validate(newElement,formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;
    return newFormdata;
}




export const isFormValid = (formdata, formName) => {
    let formIsValid = true;

    for(let key in formdata){
        formIsValid = formdata[key].valid && formIsValid
    }
    return formIsValid;
}




export const generateData = (formdata, formName) =>{
    let dataToSubmit = {};

    for(let key in formdata){
        if(key !== 'confirmPassword'){
            dataToSubmit[key] = formdata[key].value;
        }
    }
    return dataToSubmit;
}







export const populateOptionFields= (formdata, arrayData =[],field) => {
    const newArray = [];
    const newFormdata = {...formdata};

    arrayData.forEach(item=>{
        newArray.push({key:item._id,value:item.name});
    });

    newFormdata[field].config.options = newArray;
    return newFormdata;
}






export const resetFields = (formdata, formName)=>{
    const newFormdata = {...formdata};

    for(let key in newFormdata){
        if(key === 'images'){
            newFormdata[key].value = [];
        }else{
            newFormdata[key].value = '';
        }

        newFormdata[key].valid = false;
        newFormdata[key].touched = false;
        newFormdata[key].validationMessage = '';
    }

    return newFormdata
}






export const populateFields = (formData, fields) => {

    for(let key in formData){
        formData[key].value = fields[key];
        formData[key].valid = true;
        formData[key].touched = true;
        formData[key].validationMessage = ''
    }

    return formData;
}




export const filterTheData =(filterData, dateData)=>{

    console.log('#################################:')
        console.log(dateData)

    const organizeData=filterData;
    const dateA=dateData.date_a.value;
    const dateB=dateData.date_b.value;
    let firstDate='';
    let secondDate='';



    if(organizeData.dates==="0"){
        firstDate=getCurrentDate().firstDate;
        secondDate=getCurrentDate().secondDate;

    } else if(organizeData.dates==="1"){
        firstDate=getYesterdaysDate().firstDate;
        secondDate=getYesterdaysDate().secondDate;

    } else if(organizeData.dates==="2"){
        if(dateB===''){
            console.log('#$%#%$#%$#%$#%$#%$%#$#%$%#$#%$#%#$#%#$#%$#%$#%$#%$#%#$#%$#%$#%#$%#$%#$#%$')
            console.log('nothing in dateB')
            const timezone = new Date();
            var tz =timezone.getTimezoneOffset()/60
            firstDate=dateA+` 00:00:00.000001-${tz}`;
            secondDate=dateA+` 23:59:59.999999-${tz}`;

        } else if(dateA===''){
            console.log('#$%#%$#%$#%$#%$#%$%#$#%$%#$#%$#%#$#%#$#%$#%$#%$#%$#%#$#%$#%$#%#$%#$%#$#%$')
            console.log('nothing is=n dateA')
            const timezone = new Date();
            var tz =timezone.getTimezoneOffset()/60
            firstDate=dateB+` 00:00:00.000001-${tz}`;
            secondDate=dateB+` 23:59:59.999999-${tz}`;
        
        }else if(dateA<=dateB){
            const timezone = new Date();
            var tz =timezone.getTimezoneOffset()/60
            firstDate=dateA+` 00:00:00.000001-${tz}`;;
            secondDate=dateB+` 23:59:59.999999-${tz}`;;

        } else {
            const timezone = new Date();
            var tz =timezone.getTimezoneOffset()/60
            firstDate=dateB+` 00:00:00.000001-${tz}`;;
            secondDate=dateA+` 23:59:59.999999-${tz}`;;
        }
    }


    console.log("insside submitform filterData:")
        console.log('organizeData:')
        console.log(organizeData)
        console.log('dateA:')
        console.log(dateA)
        console.log('dateB:')
        console.log(dateB)

        console.log('firstDate:')
        console.log(firstDate)
        console.log('secondDate:')
        console.log(secondDate)


    return {
        firstDate: firstDate,
        secondDate: secondDate,
        order: organizeData.order,
        topics: organizeData.topics
    }
}