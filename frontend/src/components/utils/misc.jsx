

export const generateReviewData = (reviewState) =>{
    let dataToSubmit = {
    userId:reviewState.userId,
    articleId:reviewState.articleId,
    dValue: reviewState.dValue,
    cpValue: reviewState.cpValue,
    spValue: reviewState.spValue,
    likeValue: reviewState.likeValue,
    totalValue: reviewState.totalValue,
    review: reviewState.formdata.review.value,
    jsonSupportLinks: String('['+reviewState.jsonSupportLinks+']')

};

    return dataToSubmit;
}



// export const checkEligibility=(userHistory, articleId)=>{

//     //organize list
//         //search tree voteList to match articleId

//         if(){

//             return false;
//         }else{
//             return true;
//         }

// }


export function supportUrlObject(link_url, link_key, article_id, account_id){
    this.link_url = link_url;
    this.link_key = link_key;
    this.article_id = article_id;
    this.account_id = account_id;
}