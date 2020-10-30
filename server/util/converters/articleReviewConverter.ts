import { SqlArticleReview } from "../../dto/sql-articleReview";
import { ArticleReview } from "../../models/articleReview";

export function articleReviewConverter(review:SqlArticleReview){

    const reviewString=review.row;
    const parsedReview:string[]=reviewString.split(',');
    var i:number=9;
    var w:number=0;
    var links:string[]=[''];

    while(parsedReview[i]){
        if(i===9){
            //link[w]=parsedReview[i].slice(1);
            links[w]=parsedReview[i].replace(/"{/i,'');
            w++;
            i++;   
        }
        else if(i===(parsedReview.length-1)){
            links[w]=parsedReview[i].replace(/}"/i,'');
            links[w]=links[w].slice(0,-1);
            break;
        }
        else{
            links[w]=parsedReview[i]
            w++;
            i++;
        }
    }

    const reviewId:number =Number(parsedReview[0].slice(1));
    const reviewValue:string=parsedReview[1];
    const username:string=parsedReview[2];
    const detail:number=Number(parsedReview[3]);
    const prose:number=Number(parsedReview[4]);
    const sG:number=Number(parsedReview[5]);
    const likeIt:number=Number(parsedReview[6]);
    const total:number=Number(parsedReview[7]);
    const timestamped:string=parsedReview[8];
    const voteTotal:number=Number(parsedReview[9]);
    const linkUrl:string[]=links;
    
    return new ArticleReview(
        reviewId,
        reviewValue,
        username,
        detail,
        prose,
        sG,
        likeIt,
        total,
        timestamped,
        voteTotal,
        linkUrl
    );

}