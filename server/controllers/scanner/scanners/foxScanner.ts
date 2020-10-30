import { ArticleInfo } from '../../../models/articleInfo';
import axios from 'axios';
//import cheerio from 'cheerio';


export async function foxScanner(url:string):Promise<ArticleInfo|any>{

  var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

  const timeConverter =(timeS:string)=>{

    const jerk:string[]=timeS.split(' ');
    let index = jerk.indexOf('');
    jerk.splice(index, 1);
    
    //2020-06-23 07:40:25+5:30
    let i:number=0;
    let k:number=0;
    let num:number=0;
    var today = new Date();
    var timeNow:string = '';
    var tz:string ='-00';
  
    while(k<jerk.length){
      if(!isNaN(Number(jerk[k]))){
        num=Number(jerk[k]);
        k++;
      }
      else{
      
        k++;
      }
    }
  
    while(i<jerk.length){
      if(jerk[i]==='mins' || jerk[i]==='min'){ 

        today.setHours(today.getMinutes() - num);
        timeNow = today.toISOString().slice(0, 19).replace('T', ' ')+tz;

        return timeNow;

  
      }
      else if(jerk[i]==='hours' || jerk[i]==='hour'){
          
        today.setHours(today.getHours() - num)
        timeNow = today.toISOString().slice(0, 19).replace('T', ' ')+tz;

        return timeNow;


      }
      else if(jerk[i]==='days' || jerk[i]==='day'){
        
        today.setDate(today.getDate() - num)
        timeNow = today.toISOString().slice(0, 19).replace('T', ' ')+tz;

        return timeNow;

  
      }
      else if(monthNames.indexOf(jerk[i]) > -1){
        
        //var getYear = new Date;
        timeS= today+' '+timeS;
        
        let monthDate:Date=new Date(timeS);
        monthDate.setUTCHours(23, 0o0, 0o0);
        timeNow = monthDate.toISOString().slice(0, 19).replace('T', ' ')+tz;

        return timeNow;

  
      }
      i++;
    }
  
  }
  





    console.log('inside actual fox scanner');
    try{
      const scan = await axios.get(url)
      .then( async response => { 
         const siteScript:string = await response.data;
        
         const fiteString:string = String(siteScript);
         const siteString:string = fiteString.replace(/['"]+/g, "")
 
         const breakSite:string[] = siteString.split(/:|,|<|>/);
         const collect:string[]=[];
 
         let title:string ='';
         let time:string='';
 
         let i:number =0;
         let j:number =0;
 
         while(i<breakSite.length){
           if(breakSite[i]==='fullName' || breakSite[i]==='{headline' || breakSite[i]==='time'){
             if(breakSite[i]==='fullName'){
               collect.splice(j,0,breakSite[(i+1)]);
               //j++;
               i++;

             } else if(breakSite[i]==='{headline'){
               title=breakSite[i+1];
               i++;

             } else if(breakSite[i]==='time'){
              time=breakSite[i+1];
              i++;

            }
           } else {
             i++;
           }
         }

        const convertedTime=timeConverter(time);

      
  /**
   * Check to see if title and author are in database under different url?
   * 
   * Not right now
   */
         
         return {
          author: collect,
          articleTitle: title,
          datePosted: convertedTime
           
         }
      });
      return scan;
      } catch (error) {
          console.log(error);
      }

};