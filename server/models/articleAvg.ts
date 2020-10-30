export class ArticleAvg {
    
    total_avg=0;
    detail_avg=0;
    prose_avg=0;
    s_g_avg=0;
    like_avg=0;    
    
    
   

    constructor (

        total_avg:number,
        detail_avg:number,
        prose_avg:number,
        s_g_avg:number,
        like_avg:number  
        
        ){
            total_avg && (this.total_avg = total_avg);
            detail_avg && (this.detail_avg = detail_avg);
            prose_avg && (this.prose_avg = prose_avg);
            s_g_avg && (this.s_g_avg = s_g_avg);
            like_avg && (this.like_avg = like_avg);
            
        }
}