export class StarRating {
    rateId=0;
    detail=0;
    prose=0;
    sAndG=0;
    likeIt=0;
    total=0;
    articleId=0;

    constructor (
        rateId?: number, 
        detail?:number, 
        prose?:number,
        sAndG?:number,
        likeIt?:number,
        total?:number,
        articleId?:number,

        ){
            rateId && (this.rateId=rateId);
            detail && (this.detail=detail);
            prose && (this.prose=prose);
            sAndG && (this.sAndG=sAndG);
            likeIt && (this.likeIt=likeIt);
            total && (this.total=total);
            articleId && (this.articleId=articleId);
        }
}