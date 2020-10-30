import { pool }  from "../util/dbConnection/databasePool";




export async function getNetworkAvg(
    article_main_url_id:string
    ):Promise<any|any>{
   
    console.log('Inside get networkAvg');
    console.log('article_id: '+article_main_url_id);
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
            WHERE article_id IN
            (SELECT article_id FROM article
                WHERE article_main_url_id=$1 )
            `,
            [article_main_url_id]
        );

        return resp.rows[0].article_main_url_id;


    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
        client.release();
    }
}
























































export async function getAllNetworksWithTotalAvg(
    firstDate:string,
    secondDate:string, 
    order:number[]
    //order:string[]
    ):Promise<any|any>{
   
    console.log('Inside getAllNetworks');
    //console.log('article_id: '+article_main_url_id);



    let when:string='';
    let orderBy:string='';
    let andFrom:string='';
    let andGet:string ='';
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

    if(firstDate && secondDate){
        when=`WHERE date_posted BETWEEN '${firstDate}' AND '${secondDate}'`
    // } else if (firstDate){
    //     when=`WHERE date_posted `
    }else{
        null;
    }
    
    console.log('@*@**@@*@*@*@*@*@*@*@*@*@*@*@*@*@*@*@*@*@*@*@*@*@*@*@*@*@*@')
    console.log('when:')
    console.log(when);

    if(order[0] >= 0){
        
        order.every(goThroughOrder)
    }
    else{
        orderBy += 'ORDER BY b.article_main_url'
    }
    
    
    // console.log('caseWhen:');
    // console.log(caseWhen);


    // console.log('orderBy:');
    // console.log(orderBy);





    const client=await pool.connect();
   
    try{
        const resp=await client.query(
            `
            SELECT article_main_url, AVG(total)
            ${andGet}
            FROM article_main_url b
            LEFT JOIN article ar ON b.article_main_url_id = ar.article_main_url_id
            LEFT JOIN star_rating c ON ar.article_id = c.article_id
            ${andFrom}
            ${when}
            GROUP BY article_main_url
            ${orderBy}
            `
            //,
            //[article_main_url_id]
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




























// <NetworkInformation/>
// <ArticlesByNetwork/>
// <AuthorsByNetwork/>
// <NetworkAvgRating/>
// <NetworkAvgLike/>
// <CommonNetworkTags/>

export async function  getNetworkInfoPage(
    network_id:string
    ):Promise<any|any>{

    console.log('inside network-dao getNetworkInfoPage:')
    console.log('network_id: '+ network_id)

    const client= await pool.connect();

    try{
        const reviewResp=await client.query(
        `
        WITH cte AS (
            SELECT amu.article_main_url_id,
                   amu.article_main_url,
                   AVG(gr.total) as avg_total,
                   AVG(gr.like_it) as avg_like,
                   AVG(gr.detail) as avg_detail,
                   AVG(gr.prose) as avg_prose,
                   AVG(gr.s_g) as avg_s_g
                   
            FROM article_main_url amu
            LEFT JOIN article ar ON amu.article_main_url = ar.article_main_url
            LEFT JOIN star_rating gr ON ar.article_id = gr.article_id
            WHERE article_main_url=$1
        ),
        auth AS(
            SELECT cte.article_main_url_id,
                   au.author_id, 
                   au.author_name,
                   AVG(sr.total) as auth_avg
            FROM cte 
            LEFT JOIN article art ON cte.article_main_url_id = art.article_main_url_id
            LEFT JOIN article_to_author ata ON art.article_id = ata.article_id
            LEFT JOIN author au ON ata.author_id = au.author_id
            LEFT JOIN star_rating sr ON art.article_id=sr.article_id
        ),
        artic AS(
            SELECT cte.article_main_url_id,
                   article_id,
                   article_name,
                   article_url,
                   date_posted,
                   AVG(rt.total) as art_avg
            FROM cte
            LEFT JOIN article arti ON cte.article_main_url_id=arti.article_main_url_id
            LEFT JOIN star_rating rt ON arti.article_id=rt.article_id
        )
        SELECT cte.article_main_url_id,
               cte.article_main_url_id,
               cte.article_main_url,
               cte.avg_total,
               cte.avg_like,
               cte.avg_detail,
               cte.avg_prose,
               cte.avg_s_g,
               array_agg('[' || auth.auth_id || ',' || auth.auth_name || ',' || auth.auth_avg || ']') AS authors,
               array_agg('[' || artic.article_id || ',' || artic.article_name || ',' || artic.article_url || ',' 
               || artic.date_posted || ','|| artic.art_avg || ']') AS articles
        FROM cte
        LEFT JOIN auth ON auth.article_main_url_id = cte.article_main_url_id
        LEFT JOIN artic ON artic.article_main_url_id=cte.article_main_url_id
        
        `,
        [network_id]
        );

        console.log('reviewResp.rows:');
        console.log(reviewResp.rows);
        return reviewResp.rows;



    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
        client.release();
    }

}