import { pool }  from "../util/dbConnection/databasePool";
import { articleConverter } from "../util/converters/articleConverter";
import { articleInfoConverter } from "../util/converters/articleInfoConverter";
import { articleReviewConverter } from "../util/converters/articleReviewConverter";
import { articleAvgConverter } from "../util/converters/articleAvgConverter";
import { ArticleReview } from '../models/articleReview';
import { ArticleAvg } from '../models/articleAvg';
import { ArticleInfo } from '../models/articleInfo';
import { Article } from '../models/article';
import { SqlArticleReview } from '../dto/sql-articleReview';
import { SqlArticleInfo } from '../dto/sql-articleInfo';
import { parseUrl, articleScanner  } from "../controllers/scanner";

import { articleInfoWithAvgConverter } from "../util/converters/articleInfoWithAvgConverter";
import { SqlArticleInfoWithAvg } from '../dto/sql-articleInfoWithAvg';
import { ArticleInfoWithAvg } from '../models/articleInfoWithAvg';
import { Query } from "pg";




export async function findArticle(
    article_main_url:string,
    article_url:string,
    account_id:number,
    url:string
    ): Promise<object |any>{

    console.log("inside findArticle1:");

    console.log("account_id:");
    console.log(account_id)          

            const client=await pool.connect();

            try{
                const resp=await client.query(
                    `
                    SELECT a.article_id, a.article_title, a.article_url, a.date_posted, b.article_main_url, array_agg(c.author_name) as author_names, array_agg(c.author_id) as author_ids 
                    FROM article a
                    LEFT JOIN article_to_author f ON  a.article_id = f.article_id
                    LEFT JOIN author c ON f.author_id = c.author_id
                    LEFT JOIN article_main_url b ON a.article_main_url_id = b.article_main_url_id 
                    WHERE article_main_url=$1 and article_url=$2
                    GROUP BY a.article_id, a.article_title, a.article_url, b.article_main_url
                    `, 
                    [article_main_url, article_url]
                );     
                
                if(resp.rows[0]===undefined){
                    console.log("inside findArticle if statement:" );
                    
                const article = await articleScanner(url, article_main_url, article_url);

                console.log('article:');
                    console.log(article);
                
                return article;
                }
                else{
                    console.log("inside findArticle else statement");

                    console.log('resp.rows[0]:')
                    console.log(resp.rows[0])
                    
                    
                    const articleInfo = new ArticleInfo(
                        resp.rows[0].article_id,
                        resp.rows[0].article_title,  
                        resp.rows[0].article_url, 
                        resp.rows[0].article_main_url,
                        resp.rows[0].author_names,
                        resp.rows[0].author_ids,
                        resp.rows[0].date_posted
                        );

                    console.log("articleInfo:");
                    console.log(articleInfo);
                    
                    return articleInfo;
                }
            } catch (error) {
                console.log(error);
                //return error.message;
            } finally {
            client.release();
            }
    }






export async function checkEligibility(
    account_id:number,
    article_main_url: string,
    article_url:string

    ):Promise<any|any>{

    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')    
   
    console.log('Inside get checkEligibility');

    //console.log('article_main_url: '+article_main_url);

    const client=await pool.connect();
   
    try{
        const reviewedResp=await client.query(
            `
                SELECT re.review_id, re.account_id
                FROM article ar
                LEFT JOIN article_main_url amu ON ar.article_main_url_id=amu.article_main_url_id
                LEFT JOIN review re ON ar.article_id=re.article_id
                WHERE re.account_id=$1 AND amu.article_main_url=$2 AND ar.article_url=$3
            `,
            [account_id, article_main_url, article_url]
        );

        const reviewed=reviewedResp.rows[0];

        const votedResp=await client.query(
            `
                SELECT rv.review_id, rv.account_id
                FROM article ar
                LEFT JOIN article_main_url amu ON ar.article_main_url_id=amu.article_main_url_id
                LEFT JOIN review_vote rv ON ar.article_id=rv.article_id
                WHERE rv.account_id=$1 AND amu.article_main_url=$2 AND ar.article_url=$3
            `,
            [account_id, article_main_url, article_url]
        );

        const voted=votedResp.rows[0]

        console.log("voted:");
        console.log(voted);
        console.log("reviewed:");
        console.log(reviewed);


           console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
           console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
           console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')    

        if(reviewed || voted){
            console.log("flase bitch");
            
            return false;
        } else {
            console.log("true bitch");
            return true;
        }
             
        


    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
        client.release();
    }
};









export async function saveArticle(
    //article_id:number,
    article_title:string,
    author_ids:string[],
    date_posted:string,
    article_url:string,
    article_main_url_id:number
    //article_divider_url_id:number
    ):Promise<any|any>{

        console.log("inside saveArticle:");
        //console.log();

    const authorIds=new Array<number>(author_ids.length);

    
    const client=await pool.connect();
    
    try{
        const respA=await client.query(
            `
            INSERT INTO article
            (article_title, article_url, article_main_url_id, date_posted)
            VALUES ($1,$2,$3,$4)
            returning article_id, article_title, article_url, article_main_url_id, date_posted
            `,
            [
                article_title, 
                article_url,
                article_main_url_id,
                date_posted
            ]);

            console.log("respA.rows[0]:");
            console.log(respA.rows[0]);


        let i:number=0;

        while(i<author_ids.length){
        let author_id=author_ids[i];

        const respB=await client.query(
           `INSERT INTO  article_to_author
            (article_id, author_id)
            VALUES($1,$2)
            returning author_id
            `,
            [respA.rows[0].article_id, author_id]

        )
        authorIds[i]=respB.rows[0].author_id;

        i++;

        }  

        const article= new Article(respA.rows[0].article_id,
                                respA.rows[0].article_title,
                                authorIds,
                                respA.rows[0].article_url,
                                respA.rows[0].article_main_url_id,
                                respA.rows[0].date_posted);

        

        console.log("article:");
        console.log(article);
        
        console.log("article:");
        console.log(article);
        return article;
        
        
    
    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
    client.release();
    }
    }





export async function saveArticleUrl(
    article_main_url:string,
    article_divider_url:string

    ):Promise<any|any>{

        console.log("inside saveArticleUrl:");
        console.log("article_main_url:");
        console.log(article_main_url);
            console.log("article_divided_url:");
            console.log(article_divider_url)

    const client=await pool.connect();
    
    try{
        const resp=await client.query(
            `INSERT INTO article_main_url
            (article_main_url)
            VALUES($1, (
                INSERT INTO article_divider_url
                (article_divider_url)
                WHERE article_divider_url=$2
            ))
            `,
            [article_main_url,article_divider_url]

            

        );



    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
    client.release();
    }
}



 



 export async function getMainUrlId(
     article_main_url:string

     ):Promise<any|any>{
    
     console.log('Inside get MainUrlId');

     console.log('article_main_url: '+article_main_url);
     const client=await pool.connect();
    
     try{
         const resp=await client.query(
             `
             SELECT article_main_url_id FROM 
             article_main_url
             WHERE article_main_url = $1
             `,
             [article_main_url]
         );

         console.log("resp.rows[0]:");
            console.log(resp.rows[0]);
         return resp.rows[0].article_main_url_id;


     } catch (error) {
         console.log(error);
         //return error.message;
     } finally {
         client.release();
     }
 }











export async function saveArticleReview(
    
    account_id:number,
    article_id:number,
    detail:number,
    prose:number,
    s_g:number,
    like_it:number,
    total:number,
    review_value:string,
    support_url_array: any[]
   
    
    ):Promise<any|any>{

        console.log("saveArticleReview:");
        console.log("account_id:");
        console.log(account_id)
        console.log("article_id:");
        console.log(article_id);
        console.log("detail:");
        console.log(detail);
        console.log("prose:");
        console.log(prose);
            console.log("s_g:");
            console.log(s_g);
            console.log("like_it");
            console.log(like_it);
            console.log("total:");
            console.log(total);
            console.log("review_value");
            console.log(review_value);
            console.log("support_url_array:")
            console.log(support_url_array);


    const client=await pool.connect();
    
    try{
        const respA=await client.query(
             `        
             INSERT INTO support_url
             (link_url, link_key, article_id, account_id)
             SELECT * 
             FROM json_to_recordset($1)
             AS x(link_url text, link_key bigint, article_id int, account_id int)
             `,
             [
                 support_url_array
             ]);

             console.log("respA:");
            console.log(respA);

            const respB=await client.query(
                `
                WITH new_rating AS (
                    INSERT INTO star_rating 
                    (detail, prose, s_g, like_it, total, article_id, account_id)
                    VALUES ($4, $5, $6, $7, $8, $2, $3)
                    returning star_rating_id
                )
                INSERT INTO review 
                    (review_value, article_id, account_id, star_rating_id)
                    VALUES ($1, $2, $3, (SELECT star_rating_id FROM new_rating))
                
                `,
                [
                    review_value,
                    article_id,
                    account_id,
                    detail,
                    prose,
                    s_g,
                    like_it,
                    total
                ]);

                console.log("respB:");
            console.log(respB);

            
        
    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
    client.release();
    }
}





export async function getArticleAvg(
    article_id:string
    ):Promise<any|any>{
   
    console.log('Inside get getArticleTotalAvg');
    console.log('article_id: '+article_id);
    const client=await pool.connect();
   
    try{
        const resp=await client.query(
            `
            SELECT 
            AVG(total) "Total Avg",
            AVG(detail) "Detail Avg",
            AVG(prose) "Prose Avg",
            AVG(s_g) "Spell/Gram Avg",
            AVG(like_it) "Like Avg",
            FROM star_rating
            WHERE article_id=$1
            `,
            [article_id]
        );

        console.log("resp.rows[0]:");
            console.log(resp.rows[0]);
        return resp.rows[0].article_main_url_id;


    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
        client.release();
    }
}



////// Also in author-dao.ts as getAllArticlesByAllAuthors, however not for specific author's ////////////

// export async function getArticlesByAuthor(
//     author_id:string
//     ):Promise<any|any>{
   
//     console.log('Inside getArticlesByAuthor');
//     console.log('author_id: '+author_id);
//     const client=await pool.connect();
   
//     try{
//         const resp=await client.query(
//             `
//             SELECT e.article_id, e.article_title, b.author_name, 
//             b.author_id, c.article_main_url, e.article_url, AVG(total) as avg_total
//             FROM author b 
//             LEFT JOIN article_to_author d ON b.author_id = d.author_id
//             LEFT JOIN article e ON d.article_id = e.article_id
//             LEFT JOIN article_main_url c ON e.article_main_url_id = c.article_main_url_id
//             LEFT JOIN star_rating sr ON e.article_id=sr.article_id
//             WHERE b.author_id=$1
//             GROUP BY e.article_id, e.article_title, b.author_name, 
//             b.author_id, c.article_main_url, e.article_url
           
//             `,
//             [author_id]
//         );
//         console.log("resp.rows[0]:");
//             console.log(resp.rows);

//         return resp.rows;


//         //LEFT JOIN article_main_url c ON b.article_main_url_id = c.article_main_url_id
//         //array_agg('[' || b.article_id || ',' || b.article_title || ',' || b.article_url || ']'),
//     } catch (error) {
//         console.log(error);
//         //return error.message;
//     } finally {
//         client.release();
//     }
// }







export async function getArticleInfoPage(
    article_id:string
    ):Promise<any|any>{
   
    console.log('Inside getReviewsAndSupportsForArticle');
    console.log('article_id: '+article_id);

    const client=await pool.connect();
   
    try{    
        const reviewsResp=await client.query(
            `
            SELECT (b.review_id, b.review_value, c.username, d.detail, d.prose, d.s_g, 
            d.like_it, d.total, b.timestamped, SUM(f.review_vote), array_agg(e.link_url) )
                
            FROM review b 
            LEFT JOIN account c ON c.account_id = b.account_id 
            LEFT JOIN star_rating d ON d.star_rating_id=b.star_rating_id 
            LEFT JOIN review_vote f ON f.review_id = b.review_id
            LEFT JOIN support_url e ON (e.account_id=c.account_id AND e.article_id=b.article_id)
            
            WHERE b.article_id=$1
            GROUP BY b.review_id, b.review_value, c.username,
                  d.detail, d.prose, d.s_g, d.like_it, d.total, f.timestamped
            
            `,
            [article_id]
            );

        console.log('###################################')
        console.log(reviewsResp.rows[0])
        console.log('###################################')

        const reviews: ArticleReview[]=[];
        reviewsResp.rows.forEach((articleReviewResult: SqlArticleReview) => {
            reviews.push(articleReviewConverter(articleReviewResult))
        });


        console.log("reviews:");
            console.log(reviews);

        const articleBasicInfoResp=await client.query(
            `
            SELECT a.article_id, a.article_title, a.article_url, a.date_posted, b.article_main_url, 
            array_agg(c.author_name) AS author_name, array_agg(c.author_id) AS author_id
            FROM article a 
            LEFT JOIN article_to_author d ON a.article_id = d.article_id
            LEFT JOIN author c ON d.author_id = c.author_id
            LEFT JOIN article_main_url b ON a.article_main_url_id = b.article_main_url_id 
            WHERE a.article_id=$1
            GROUP BY a.article_id, a.article_title, a.article_url, b.article_main_url
            `,
            [article_id]
        );

        

        const basicInfo = articleInfoConverter(articleBasicInfoResp.rows[0])

        console.log("basicInfo:");
            console.log(basicInfo);
        

        const articleAvgResp=await client.query(
            `
            SELECT 
            AVG(total) total_avg,
            AVG(detail) detail_avg,
            AVG(prose) prose_avg,
            AVG(s_g) s_g_avg,
            AVG(like_it) like_avg
            FROM star_rating
            WHERE article_id=$1
            `,
            [article_id]
        );

        
        const articleAvg:ArticleAvg=articleAvgResp.rows[0];

        console.log("articleAvg:");
        console.log(articleAvg);

        
        return {
            reviews: reviews,
            avg: articleAvg,
            basic: basicInfo
        }


    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
        client.release();
    }
}












export async function getArticleIdByUrl(
    article_url:string,
    article_main_url:string
    
    ):Promise<any|any>{

        console.log('getArticleIdByUrl')
    const client=await pool.connect();
   
    try{
        const resp=await client.query(
            `
            SELECT ar.article_id
            FROM article ar
            LEFT JOIN article_main_url amu ON ar.article_main_url_id = amu.article_main_url_id
            WHERE article_url=$1 AND article_main_url=$2 
            `,
            [article_url, article_main_url]
        );

        console.log('resp.rows[0]:')
        console.log(resp.rows[0])

        return resp.rows[0].article_id;


    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
        client.release();
    }
}









































export async function getArticlesByNetwork(
    article_main_url:string
    
    ):Promise<any|any>{
   
    console.log('Inside getArticlesByNetwork');
    
    console.log('article_main_url:')
    console.log(article_main_url)




    const client=await pool.connect();
   
    try{
        const resp=await client.query(
            `
            SELECT a.article_id, a.article_title, a.article_url, d.article_main_url,
            array_agg(DISTINCT c.author_name) AS author_name, 
            array_agg(DISTINCT c.author_id) AS author_id, AVG(total) AS avg_total
            FROM article a
            LEFT JOIN article_to_author b ON a.article_id=b.article_id
            LEFT JOIN author c ON b.author_id = c.author_id
            LEFT JOIN article_main_url d ON a.article_main_url_id = d.article_main_url_id
            LEFT JOIN star_rating sr ON a.article_id = sr.article_id
            WHERE article_main_url=$1
            GROUP BY a.article_id, a.article_title, a.article_url, d.article_main_url
            `,
            [article_main_url]
        );

        console.log("resp.rows[0]:");
        console.log(resp.rows);
        const articles: ArticleInfoWithAvg[]=[]
        resp.rows.forEach((articleResult: SqlArticleInfoWithAvg)=>{
            articles.push(articleInfoWithAvgConverter(articleResult))
        });

        console.log('articles:');
        console.log(articles);
        return articles;


    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
        client.release();
    }
}








export async function getAllArticlesAndNetworks(
    firstDate:string,
    secondDate:string,
    order:number[]
    ):Promise<any|any>{
   
    console.log('Inside getAllArticlesAndNetworks');

    console.log('firstDate: '+firstDate);
    console.log('secondDate: '+secondDate);


    let caseWhen:string='';
    let artOrderBy:string='';
    let netOrderBy:string='';
    let orderBy:string='';
    let andFrom:string='';
    let netFrom:string='';
    let andGet:string ='';
    let newGet:string='';
    let netGet:string='';
    let groupBy:string='';
    let artSelect:string='';
    let when:string='';
    //let value:string='';


    function goThroughOrder(orderValue:number){
        if(orderValue === 0){
            andGet += ', COUNT(re.review_id) as total_reviews';
            andFrom += 'LEFT JOIN review re ON ar.article_id=re.article_id';
            
            netGet += ', COUNT(rv.review_id) as net_total_reviews';
            netFrom += ' LEFT JOIN review rv ON art.article_id = rv.article_id';

            newGet += 'net_avg.net_total_reviews,'

            artSelect += " ',' || cte.total_reviews || ";
            artOrderBy += 'ORDER BY cte.total_reviews ASC'
            groupBy +=', net_avg.net_total_reviews';
            netOrderBy += `ORDER BY net_avg.net_total_reviews ASC`
        }



        else if(orderValue === 1){
            andGet += ', COUNT(re.review_id) as total_reviews';
            andFrom += 'LEFT JOIN review re ON ar.article_id=re.article_id';
            
            netGet += ', COUNT(rv.review_id) as net_total_reviews';
            netFrom += ' LEFT JOIN review rv ON art.article_id = rv.article_id';

            newGet += 'net_avg.net_total_reviews,'

            artSelect += " ',' || cte.total_reviews || ";
            artOrderBy += 'ORDER BY cte.total_reviews DESC'
            groupBy +=', net_avg.net_total_reviews';
            netOrderBy += `ORDER BY net_avg.net_total_reviews DESC`;
        }
        else if(orderValue === 2){

            andGet += ', STDDEV(gr.total) as stand_total';
            //andFrom += 'LEFT JOIN review re ON ar.article_id=re.article_id';
            
            netGet += ', STDDEV(sr.total) as net_stand_total';
            //netFrom += ' LEFT JOIN review rv ON art.article_id = rv.article_id';

            newGet += 'net_avg.net_stand_total,';

            artSelect += " ',' || cte.stand_total || ";
            artOrderBy += 'ORDER BY cte.stand_total ASC';
            groupBy +=', net_avg.net_stand_total';
            netOrderBy += `ORDER BY net_avg.net_stand_total ASC`;

        
        }
        else if(orderValue === 3){
            andGet += ', STDDEV(gr.total) as stand_total';
            //andFrom += 'LEFT JOIN review re ON ar.article_id=re.article_id';
            
            netGet += ', STDDEV(sr.total) as net_stand_total';
            //netFrom += ' LEFT JOIN review rv ON art.article_id = rv.article_id';

            newGet += 'net_avg.net_stand_total,';

            artSelect += " ',' || cte.stand_total || ";
            artOrderBy += 'ORDER BY cte.stand_total DESC';
            groupBy +=', net_avg.net_stand_total';
            netOrderBy += `ORDER BY net_avg.net_stand_total DESC`;
        }
        else if(orderValue === 4){
            andGet += ', COUNT(su.support_url_id) as total_support';
            andFrom += 'LEFT JOIN support_url su ON ar.article_id=su.article_id';
            
            netGet += ', COUNT(sp.support_url_id) as net_total_support';
            netFrom += ' LEFT JOIN support_url sp ON art.article_id = sp.article_id';

            newGet += 'net_avg.net_total_support,'

            artSelect += " ',' || cte.total_support || ";
            artOrderBy += 'ORDER BY cte.total_support ASC'
            groupBy +=', net_avg.net_total_support';
            netOrderBy += `ORDER BY net_avg.net_total_support ASC`
        }
        else if(orderValue === 5){
            andGet += ', COUNT(su.support_url_id) as total_support';
            andFrom += 'LEFT JOIN support_url su ON ar.article_id=su.article_id';
            
            netGet += ', COUNT(sp.support_url_id) as net_total_support';
            netFrom += ' LEFT JOIN support_url sp ON art.article_id = sp.article_id';

            newGet += 'net_avg.net_total_support,'

            artSelect += " ',' || cte.total_support || ";
            artOrderBy += 'ORDER BY cte.total_support DESC'
            groupBy +=', net_avg.net_total_support';
            netOrderBy += `ORDER BY net_avg.net_total_support DESC`
        }
        else if(orderValue === 6){
            artOrderBy += `ORDER BY cte.avg_total ASC `
            groupBy += ', net_avg.net_avg_total'
            netOrderBy += 'ORDER BY net_avg.net_avg_total ASC'

        }
        else if(orderValue === 7){
            //newGet += ', net_avg.net_avg_total'
            artOrderBy += `ORDER BY cte.avg_total DESC `
            groupBy += ', net_avg.net_avg_total'
            netOrderBy += 'ORDER BY net_avg.net_avg_total DESC'
        }
        else if(orderValue === 8){
            andGet += ', AVG(gr.like_it) as like_avg';
            netGet += ', AVG(sr.like_it) as net_like_avg';


            //newGet += ', net_avg.net_like_avg';

            artSelect += " ',' || cte.like_avg || ";
            artOrderBy += 'ORDER BY cte.like_avg ASC';

            newGet += ' net_avg.net_like_avg,'
            groupBy += ' ,net_avg.net_like_avg'
            netOrderBy += `ORDER BY net_avg.net_like_avg ASC `
        }
        else if(orderValue === 9){
            andGet += ', AVG(gr.like_it) as like_avg';
            netGet += ', AVG(sr.like_it) as net_like_avg';


           // newGet += ', net_avg.net_like_avg';

            artSelect += " ',' || cte.like_avg || ";
            artOrderBy += 'ORDER BY cte.like_avg DESC';

            newGet += ' net_avg.net_like_avg,'
            groupBy += ' ,net_avg.net_like_avg'
            netOrderBy += `ORDER BY net_avg.net_like_avg DESC `
        }
        else if(orderValue === 10){
            andGet += ', AVG(gr.s_g) as sg_avg';
            netGet += ', AVG(sr.s_g) as net_sg_avg';


            //newGet += ', net_avg.net_sg_avg';

            artSelect += " ',' || cte.sg_avg || ";
            artOrderBy += 'ORDER BY cte.sg_avg ASC';

            newGet += ' net_avg.net_sg_avg,'
            groupBy += ' ,net_avg.net_sg_avg'
            netOrderBy += `ORDER BY net_avg.net_sg_avg ASC `
        }
        else if(orderValue === 11){
            andGet += ', AVG(gr.s_g) as sg_avg';
            netGet += ', AVG(sr.s_g) as net_sg_avg';


            //newGet += ', net_avg.net_sg_avg';

            artSelect += " ',' || cte.sg_avg || ";
            artOrderBy += 'ORDER BY cte.sg_avg DESC';

            newGet += ' net_avg.net_sg_avg,'
            groupBy += ' ,net_avg.net_sg_avg'

            netOrderBy += `ORDER BY net_avg.net_sg_avg DESC `
        }
    }

    // if(filters[0] !==''){
    //     orderBy += 'ORDER BY ';
    //     filters.every(goThroughOrder)
    // }
    
    if(order[0] >=0){
        
        order.every(goThroughOrder)
    }
    else{
        artOrderBy += 'ORDER BY cte.article_title';
        netOrderBy += 'ORDER BY cte.article_main_url';
        //groupBy += ', cte.author_name'
    }


    if(firstDate && secondDate){
        when=`WHERE date_posted BETWEEN '${firstDate}' AND '${secondDate}'`
    }else{
        null;
    }

    // console.log('caseWhen:');
    // console.log(caseWhen);


    // console.log('orderBy:');
    // console.log(orderBy);

   
    const client=await pool.connect();
   
    try{
        const resp=await client.query(
            `
            WITH cte AS (
                SELECT ag.article_main_url_id,
                       ag.article_main_url,
                       ar.article_id, 
                       ar.article_title, 
                       ar.article_url,
                       string_agg(DISTINCT au.author_name, ',') as authors,
                       AVG(gr.total) as avg_total
                       ${andGet}
                  FROM article_main_url ag
                       LEFT JOIN article ar on ar.article_main_url_id=ag.article_main_url_id
                       LEFT JOIN article_to_author ata ON ar.article_id = ata.article_id
                       LEFT JOIN author au ON ata.author_id = au.author_id 
                       LEFT JOIN star_rating gr ON ar.article_id = gr.article_id
                       ${andFrom}
                 ${when}
                 GROUP BY ag.article_main_url_id, ag.article_main_url, ar.article_id, ar.article_title
                 ),
              net_avg AS (
                  SELECT cte.article_main_url_id, 
                         cte.article_main_url,
                         AVG(sr.total) as net_avg_total
                         ${netGet}
                  FROM cte
                         LEFT JOIN article art on art.article_main_url_id=cte.article_main_url_id
                         LEFT JOIN article_to_author at ON art.article_id = at.article_id
                         LEFT JOIN star_rating sr ON art.article_id = sr.article_id
                         ${netFrom}
                  
                  GROUP BY cte.article_main_url_id, cte.article_main_url
              )
              SELECT cte.article_main_url_id, 
                     cte.article_main_url,
                     net_avg.net_avg_total,
                     ${newGet}
                     array_agg('[' || article_id || ',' || article_title || ',' || article_url || ',' || 
                     '[' || authors || ']' || ',' || avg_total ||${artSelect}']' ${artOrderBy}) AS article
                FROM cte 
                LEFT JOIN net_avg ON cte.article_main_url_id = net_avg.article_main_url_id
                
               GROUP BY cte.article_main_url_id, cte.article_main_url, net_avg.net_avg_total${groupBy}
               ${netOrderBy}
            `
        );

        console.log('resp.rows:');
        console.log(resp.rows);
        
        return resp.rows;


    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
        client.release();
    }
}







export async function getAllArticlesWithTotalAvg(
    firstDate:string,
    secondDate:string,
    order:number[]
   
    ):Promise<any|any>{
   
    console.log('Inside getAllarticles');
    console.log('firstDate: '+firstDate);
    console.log('secondDate: '+secondDate);

    
    console.log('order:');
    console.log(order);


    let caseWhen:string='';
    let orderBy:string='';
    let andFrom:string='';
    let andGet:string ='';
    let when:string='';
    //let value:string='';


    function goThroughOrder(orderValue:number){
        if(orderValue === 0){
            andGet += ', COUNT(re.review_id) as total_reviews'
            andFrom += 'LEFT JOIN review re ON ar.article_id=re.article_id'
            orderBy += `ORDER BY total_reviews ASC`
        }
        else if(orderValue === 1){
            andGet += ', COUNT(re.review_id) as total_reviews'
            andFrom += 'LEFT JOIN review re ON ar.article_id=re.arcticle_id'
            orderBy += `ORDER BY total_reviews DESC`
        }
        else if(orderValue === 2){
            andGet += `, STDEV(c.total) as stand_total`
            //andFrom += 'LEFT JOIN '
            orderBy += 'ORDER BY stand_total ASC'
        }
        else if(orderValue === 3){
            andGet += `, STDEV(c.total) as stand_total`
            //andFrom += 'LEFT JOIN '
            orderBy += 'ORDER BY stand_total DESC'
        }
        else if(orderValue === 4){
            andGet += ', COUNT(su.support_url_id) as support_count'
            andFrom += 'LEFT JOIN support_url su ON ar.article_id=su.article_id '
            orderBy += `ORDER BY support_count ASC `
        }
        else if(orderValue === 5){
            andGet += ', COUNT(su.support_url_id) as support_count'
            andFrom += 'LEFT JOIN support_url su ON ar.article_id=su.article_id '
            orderBy += `ORDER BY support_count DESC `
        }
        else if(orderValue === 6){
            andGet += ', AVG(c.total) as total_avg'
            orderBy += `ORDER BY total_avg ASC `
        }
        else if(orderValue === 7){
            andGet += ', AVG(c.total) as total_avg'
            orderBy += `ORDER BY total_avg ASC `
        }
        else if(orderValue === 8){
            andGet += ', AVG(c.like_it) as like_avg'
            orderBy += `ORDER BY like_avg ASC `
        }
        else if(orderValue === 9){
            andGet += ', AVG(c.like_it) as like_avg'
            orderBy += `ORDER BY like_avg DESC `
        }
        else if(orderValue === 10){
            andGet += ', AVG(c.s_g) as sg_avg'
            orderBy += `ORDER BY sg_avg ASC `
        }
        else if(orderValue === 11){
            andGet += ', AVG(c.s_g) as sg_avg'
            orderBy += `ORDER BY sg_avg DESC `
        }
    }

    // if(filters[0] !==''){
    //     orderBy += 'ORDER BY ';
    //     filters.every(goThroughOrder)
    // }
    
    if(order[0] >= 0){
        
        order.every(goThroughOrder)
    }
    else{
        orderBy += 'ORDER BY ar.article_title'
    }

    if(firstDate && secondDate){
        when=`WHERE date_posted BETWEEN '${firstDate}' AND '${secondDate}'`
    }else{
        null;
    }
    
    
    // console.log('caseWhen:');
    // console.log(caseWhen);


    // console.log('orderBy:');
    // console.log(orderBy);


    
    const client=await pool.connect();
   
    try{
        const resp=await client.query(
            `
            SELECT ar.article_id, ar.article_title, mu.article_main_url, ar.article_url, 
                    string_agg(DISTINCT au.author_name, ','), AVG(c.total)
            ${andGet}
            FROM article ar
            LEFT JOIN article_to_author ata ON ata.article_id=ar.article_id
            LEFT JOIN article_main_url mu ON ar.article_main_url_id=mu.article_main_url_id
            LEFT JOIN author au ON ata.author_id = au.author_id
            LEFT JOIN star_rating c ON ar.article_id = c.article_id
            ${andFrom}
            ${when}
            GROUP BY ar.article_id, ar.article_title, mu.article_main_url, ar.article_url
            ${orderBy}
            `
        );

        console.log('resp.rows:');
        console.log(resp.rows);

        return resp.rows;


    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
        client.release();
    }
}


