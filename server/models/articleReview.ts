export class ArticleReview {
    review_id=0;
    review_value='';
    username='';
    detail=0;
    prose=0;
    s_g=0;
    like_it=0;
    total=0;
    timestamped='';
    vote_total=0;
    link_url=[''];
    
   

    constructor (
        review_id:number,
        review_value:string,
        username:string,
        detail:number,
        prose:number,
        s_g:number,
        like_it:number,
        total:number,
        timestamped:string,
        vote_total:number,
        link_url:string[]
        



        
        ){
            review_id && (this.review_id = review_id);
            review_value && (this.review_value = review_value);
            username && (this. username =  username);
            detail && (this.detail = detail);
            prose && (this.prose = prose);
            s_g && (this.s_g = s_g);
            like_it && (this.like_it = like_it);
            total && (this.total = total);
            timestamped && (this.timestamped=timestamped);
            vote_total && (this.vote_total = vote_total);
            link_url && (this.link_url = link_url);
            
            
        }
}