//import { SingleInput } from './Form/single_input';




export function getCurrentDate(){
    const today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    var tz =today.getTimezoneOffset()/60

    const beginToday=`${yyyy}-${mm}-${dd} 00:00:00.000001-${tz}`
    const endToday=`${yyyy}-${mm}-${dd} 23:59:59.999999-${tz}`

    return {firstDate: beginToday,
            secondDate: endToday
            }

}



export function getYesterdaysDate(){
    const yesterday = new Date();
    var dd =yesterday.getDate()-1;
    var mm = yesterday.getMonth()+1; //As January is 0.
    var yyyy = yesterday.getFullYear();
    var tz =yesterday.getTimezoneOffset()/60

    const beginYesterday=`${yyyy}-${mm}-${dd} 00:00:00.000001-${tz}`
    const endYesterday=`${yyyy}-${mm}-${dd} 23:59:59.999999-${tz}`
    return {firstDate: beginYesterday,
            secondDate: endYesterday
            }

}



// export function typeInDate(){

//     SingleInput

//     return aDate;

// }
