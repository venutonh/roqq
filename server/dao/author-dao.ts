import { pool }  from "../util/dbConnection/databasePool";
import { networkAuthConverter } from "../util/converters/networkAuthConverter";
import { NetworkAuthors } from '../models/networkAuth';
import { SqlNetworkAuthors } from '../dto/sql-networkAuth';

import { authorArticlesConverter } from "../util/converters/authorArticlesConverter";
import { AuthorArticles } from '../models/authorArticles';
import { SqlAuthorArticles } from '../dto/sql-authorArticles';
import { isRegExp } from "util";
import { filter } from "compression";
import { Certificate } from "crypto";







export async function getOrSaveAuthor(
    author_names:string[]
    ):Promise<any|any>{

    console.log('inside getOrSaveAuthor');

    console.log("author_names:");
    console.log(author_names);

    let author_ids=new Array<number>(author_names.length);
    console.log('author_ids:');
    console.log(author_ids);
    
    let i:number=0;
    
    while(i<author_names.length){
        console.log("start of while loop:")
        let author_name=author_names[i];
        

    const client=await pool.connect();
    
    try{
        const respA=await client.query(
            `SELECT author_id FROM author
            WHERE author_name = $1
            `,
            [author_name]
        
        );

        
            console.log("respA.rows[0]:");
        console.log(respA.rows[0]);
        

         if(respA.rows[0]){
            console.log("author2: " + author_name);
            author_ids[i]= respA.rows[0].author_id;
            console.log('author_ids:');
            console.log(author_ids);
            i++;


         } else {
            console.log("author3: " + author_name);
             const respB=await client.query(
                `INSERT INTO author 
                (author_name)
                VALUES ($1)
                returning author_id`,
                [author_name]
                );
                console.log(respB.rows[0]);
                console.log("author4: " + author_name);
                author_ids[i]= respB.rows[0].author_id;

                console.log('author_ids:');
                console.log(author_ids);
                i++;

        }
        

    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
    client.release();
    }


    
}
console.log("outside (finished) while loop:")
console.log('author_ids:');
console.log(author_ids);

return author_ids;
}













export async function getAuthorAvg(
    author_id:string
    ):Promise<any|any>{
   

        
    console.log('Inside get getAuthorAvg');
    console.log('article_id: '+author_id);
    const client=await pool.connect();
   
    try{
        const resp=await client.query(
            `
            SELECT 
            p.author_id,
            AVG(s.total) "TotalAvg",
            AVG(s.detail) "DetailAvg",
            AVG(s.prose) "ProseAvg",
            AVG(s.s_g) "SpellGramAvg",
            AVG(s.like_it) "LikeAvg"
            FROM star_rating s
            LEFT JOIN article q ON s.article_id=q.article_id
            LEFT JOIN article_to_author h ON q.article_id=h.article_id
            LEFT JOIN author p ON h.author_id=p.author_id
            WHERE p.author_id=$1
            GROUP BY p.author_id
            `,
            [author_id]
        );

        console.log('resp.rows[0]:');
        console.log(resp.rows[0]);
        return {
            authorId: resp.rows[0].author_id,
            totalAvg: resp.rows[0].TotalAvg,
            detailAvg: resp.rows[0].DetailAvg,
            proseAvg: resp.rows[0].ProseAvg,
            sgAvg: resp.rows[0].SpellGramAvg,
            likeAvg: resp.rows[0].LikeAvg
        };


    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
        client.release();
    }
}









/**
 * 
 * ADD AVERAGE'S
 * 
 */
export async function getArticlesByAuthor(
    author_id:string
    ):Promise<any|any>{
   
    console.log('Inside getArticlesByAuthor');
    console.log('author_id: '+author_id);
    const client=await pool.connect();
   
    try{
        const resp=await client.query(
            `
            WITH ast AS (
                SELECT 
                f.article_main_url_id, 
                b.article_main_url,
                c.author_id, 
                c.author_name, 
                f.article_id,
                f.article_title,
                f.article_url,
                AVG(sr.total) as avg_total
            FROM article f
                LEFT JOIN article_main_url b ON b.article_main_url_id = f.article_main_url_id 
                LEFT JOIN article_to_author v ON f.article_id = v.article_id
                LEFT JOIN author c ON c.author_id = v.author_id
                LEFT JOIN star_rating sr ON f.article_id = sr.article_id
                WHERE c.author_id=$1
                GROUP BY f.article_main_url_id, b.article_main_url, c.author_id, c.author_name, f.article_id, f.article_title, f.article_url
            )
            SELECT 
                author_id,
                author_name,
                article_main_url_id,
                article_main_url,
                array_agg('[' || article_id || ',' || article_title || ',' || article_url || ',' || avg_total || ']' ) AS articles
            FROM ast
            GROUP BY author_id, author_name, article_main_url_id, article_main_url
            `,
            [author_id]
        );

        const authorArticles = authorArticlesConverter(resp.rows[0]);
        console.log('authorArticles:')
        console.log(authorArticles)
        return authorArticles;

        //console.log('resp.rows:');
        //console.log(resp.rows);
        //return resp.rows;


    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
        client.release();
    }
}




































































export async function getAllAuthorsWithTotalAvg(
    firstDate:string,
    secondDate:string, 
    order:number[]
    ):Promise<any|any>{
   
    console.log('Inside getAllAuthors');
    console.log('firstDate: '+firstDate);
    console.log('secondDate: '+secondDate);


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
    
    if(order[0] >=0){
        
        order.every(goThroughOrder)
    }
    else{
        orderBy += 'ORDER BY au.author_name'
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
            SELECT (au.author_id, au.author_name, AVG(c.total), am.article_main_url)
            ${andGet}
            FROM author au
            LEFT JOIN article_to_author ata ON ata.author_id=au.author_id
            LEFT JOIN article ar ON ata.article_id = ar.article_id
            LEFT JOIN star_rating c ON ar.article_id = c.article_id
            LEFT JOIN article_main_url am ON ar.article_main_url_id = am.article_main_url_id
            ${andFrom}
            ${when}
            GROUP BY au.author_id, au.author_name, am.article_main_url
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
















export async function getAllAuthorsAndNetworks(
    firstDate:string,
    secondDate:string, 
    order:number[]
    
    ):Promise<any|any>{
   
    console.log('Inside getAuthorsByNetwork');
    //console.log('article_main_url_id: '+article_main_url_id);
    console.log('firstDate: '+firstDate);
    console.log('secondDate: '+secondDate);

    let caseWhen:string='';
    let authOrderBy:string='';
    let netOrderBy:string='';
    let orderBy:string='';
    let andFrom:string='';
    let netFrom:string='';
    let andGet:string ='';
    let newGet:string='';
    let netGet:string='';
    let groupBy:string='';
    let authSelect:string='';
    let when:string='';
    //let value:string='';


    function goThroughOrder(orderValue:number){
        if(orderValue === 0){
            andGet += ', COUNT(re.review_id) as total_reviews';
            andFrom += 'LEFT JOIN review re ON ar.article_id=re.article_id';
            
            netGet += ', COUNT(rv.review_id) as net_total_reviews';
            netFrom += ' LEFT JOIN review rv ON art.article_id = rv.article_id';

            newGet += 'net_avg.net_total_reviews,'

            authSelect += " ',' || cte.total_reviews || ";
            authOrderBy += 'ORDER BY cte.total_reviews ASC'
            groupBy +=', net_avg.net_total_reviews';
            netOrderBy += `ORDER BY net_avg.net_total_reviews ASC`
        }



        else if(orderValue === 1){
            andGet += ', COUNT(re.review_id) as total_reviews';
            andFrom += 'LEFT JOIN review re ON ar.article_id=re.article_id';
            
            netGet += ', COUNT(rv.review_id) as net_total_reviews';
            netFrom += ' LEFT JOIN review rv ON art.article_id = rv.article_id';

            newGet += 'net_avg.net_total_reviews,'

            authSelect += " ',' || cte.total_reviews || ";
            authOrderBy += 'ORDER BY cte.total_reviews DESC'
            groupBy +=', net_avg.net_total_reviews';
            netOrderBy += `ORDER BY net_avg.net_total_reviews DESC`;
        }
        else if(orderValue === 2){

            andGet += ', STDDEV(gr.total) as stand_total';
            //andFrom += 'LEFT JOIN review re ON ar.article_id=re.article_id';
            
            netGet += ', STDDEV(sr.total) as net_stand_total';
            //netFrom += ' LEFT JOIN review rv ON art.article_id = rv.article_id';

            newGet += 'net_avg.net_stand_total,';

            authSelect += " ',' || cte.stand_total || ";
            authOrderBy += 'ORDER BY cte.stand_total ASC';
            groupBy +=', net_avg.net_stand_total';
            netOrderBy += `ORDER BY net_avg.net_stand_total ASC`;

        
        }
        else if(orderValue === 3){
            andGet += ', STDDEV(gr.total) as stand_total';
            //andFrom += 'LEFT JOIN review re ON ar.article_id=re.article_id';
            
            netGet += ', STDDEV(sr.total) as net_stand_total';
            //netFrom += ' LEFT JOIN review rv ON art.article_id = rv.article_id';

            newGet += 'net_avg.net_stand_total,';

            authSelect += " ',' || cte.stand_total || ";
            authOrderBy += 'ORDER BY cte.stand_total DESC';
            groupBy +=', net_avg.net_stand_total';
            netOrderBy += `ORDER BY net_avg.net_stand_total DESC`;
        }
        else if(orderValue === 4){
            andGet += ', COUNT(su.support_url_id) as total_support';
            andFrom += 'LEFT JOIN support_url su ON ar.article_id=su.article_id';
            
            netGet += ', COUNT(sp.support_url_id) as net_total_support';
            netFrom += ' LEFT JOIN support_url sp ON art.article_id = sp.article_id';

            newGet += 'net_avg.net_total_support,'

            authSelect += " ',' || cte.total_support || ";
            authOrderBy += 'ORDER BY cte.total_support ASC'
            groupBy +=', net_avg.net_total_support';
            netOrderBy += `ORDER BY net_avg.net_total_support ASC`
        }
        else if(orderValue === 5){
            andGet += ', COUNT(su.support_url_id) as total_support';
            andFrom += 'LEFT JOIN support_url su ON ar.article_id=su.article_id';
            
            netGet += ', COUNT(sp.support_url_id) as net_total_support';
            netFrom += ' LEFT JOIN support_url sp ON art.article_id = sp.article_id';

            newGet += 'net_avg.net_total_support,'

            authSelect += " ',' || cte.total_support || ";
            authOrderBy += 'ORDER BY cte.total_support DESC'
            groupBy +=', net_avg.net_total_support';
            netOrderBy += `ORDER BY net_avg.net_total_support DESC`
        }
        else if(orderValue === 6){
            authOrderBy += `ORDER BY cte.avg_total ASC `
            netOrderBy += 'ORDER BY net_avg.net_avg_total ASC'
        }
        else if(orderValue === 7){
            //newGet += ', net_avg.net_avg_total'
            authOrderBy += `ORDER BY cte.avg_total DESC `
            netOrderBy += 'ORDER BY net_avg.net_avg_total DESC'
        }
        else if(orderValue === 8){
            andGet += ', AVG(gr.like_it) as like_avg';
            netGet += ', AVG(sr.like_it) as net_like_avg';


            //newGet += ', net_avg.net_like_avg';

            authSelect += " ',' || cte.like_avg || ";
            authOrderBy += 'ORDER BY cte.like_avg ASC';

            newGet += ' net_avg.net_like_avg,'
            groupBy += ' ,net_avg.net_like_avg'
            netOrderBy += `ORDER BY net_avg.net_like_avg ASC `
        }
        else if(orderValue === 9){
            andGet += ', AVG(gr.like_it) as like_avg';
            netGet += ', AVG(sr.like_it) as net_like_avg';


           // newGet += ', net_avg.net_like_avg';

            authSelect += " ',' || cte.like_avg || ";
            authOrderBy += 'ORDER BY cte.like_avg DESC';

            newGet += ' net_avg.net_like_avg,'
            groupBy += ' ,net_avg.net_like_avg'
            netOrderBy += `ORDER BY net_avg.net_like_avg DESC `
        }
        else if(orderValue === 10){
            andGet += ', AVG(gr.s_g) as sg_avg';
            netGet += ', AVG(sr.s_g) as net_sg_avg';


            //newGet += ', net_avg.net_sg_avg';

            authSelect += " ',' || cte.sg_avg || ";
            authOrderBy += 'ORDER BY cte.sg_avg ASC';

            newGet += ' net_avg.net_sg_avg,'
            groupBy += ' ,net_avg.net_sg_avg'
            netOrderBy += `ORDER BY net_avg.net_sg_avg ASC `
        }
        else if(orderValue === 11){
            andGet += ', AVG(gr.s_g) as sg_avg';
            netGet += ', AVG(sr.s_g) as net_sg_avg';


            //newGet += ', net_avg.net_sg_avg';

            authSelect += " ',' || cte.sg_avg || ";
            authOrderBy += 'ORDER BY cte.sg_avg DESC';

            newGet += ' net_avg.net_sg_avg,'
            groupBy += ' ,net_avg.net_sg_avg'

            netOrderBy += `ORDER BY net_avg.net_sg_avg DESC `
        }
    }

    if(firstDate && secondDate){
        when=`WHERE date_posted BETWEEN '${firstDate}' AND '${secondDate}'`
    }else{
        null;
    }

    // if(filters[0] !==''){
    //     orderBy += 'ORDER BY ';
    //     filters.every(goThroughOrder)
    // }
    
    if(order[0] >=0){
        
        order.every(goThroughOrder)
    }
    else{
        authOrderBy += 'ORDER BY cte.author_name';
        netOrderBy += 'ORDER BY cte.article_main_url';
        //groupBy += ', cte.author_name'
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
                       au.author_id, 
                       au.author_name, 
                       AVG(gr.total) as avg_total
                       ${andGet}
                  FROM article_main_url ag
                       LEFT JOIN article ar on ar.article_main_url_id=ag.article_main_url_id
                       LEFT JOIN article_to_author ata ON ar.article_id = ata.article_id
                       LEFT JOIN author au ON ata.author_id = au.author_id 
                       LEFT JOIN star_rating gr ON ar.article_id = gr.article_id
                       ${andFrom}
                 ${when}
                 GROUP BY ag.article_main_url_id, ag.article_main_url, au.author_id, au.author_name
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
                     array_agg('[' || cte.author_id || ',' || cte.author_name || ',' || cte.avg_total ||${authSelect}']' ${authOrderBy}) AS author
                     
                FROM cte 
                LEFT JOIN net_avg ON cte.article_main_url_id = net_avg.article_main_url_id
                    
               GROUP BY cte.article_main_url_id, cte.article_main_url, net_avg.net_avg_total${groupBy}
               ${netOrderBy}
               
            `
            
        );

        console.log('resp.rows:');
        console.log(resp.rows);

        // const networkAuth: NetworkAuthors[]=[]
        // resp.rows.forEach((networkAuthResult: SqlNetworkAuthors)=>{
        //     networkAuth.push(networkAuthConverter(networkAuthResult))
        // });

        //console.log('networkAuth:');
        //console.log(networkAuth);
        
        
        return resp.rows;


        


    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
        client.release();
    }
}














export async function getAllArticlesByAllAuthors(
    firstDate:string,
    secondDate:string, 
    order:number[]
    //article_main_url_id:string
    ):Promise<any|any>{
   
    console.log('Inside getAllArticlesByAllAuthors');
    //console.log('article_main_url_id: '+article_main_url_id);

    console.log('firstDate: '+firstDate);
    console.log('secondDate: '+secondDate);
    console.log('typeof order:')
    console.log(typeof order)
    console.log('order:');
    console.log(order);

    console.log('order.length:');
    console.log(order.length);



        //const modFilters:string[]=filters.splice(3,3);

        //console.log('modFilters:');
        //console.log(modFilters);


       // order.concat(modFilters)

        //console.log('order2:');
        //console.log(order);
    
    

    let orderByArt:string='';
    let orderByAuth:string='';
    let orderByNet:string='';

    let andSelect:string='';

    let authSelect:string='';
    let authFrom:string='';
    let authGroupBy='';
    let andFrom:string='';

    let alsoSelect:string='';

    let when:string='';
    let addCount:string='';
    let andGroupBy:string='';
    let andAASelect:string='';
    let dontForget:string='';

    let andACSelect:string='';

    let netSelect:string='';
    let netFrom:string='';
    let andNASelect:string='';
    let netGroupBy:string='';
    let netAvgGroupBy:string='';
    //let value:string='';




    //${order.length-1 > order.indexOf(orderValue) ? ',' : ''}`
    //${order.length-1 > order.indexOf(orderValue) ? ',' : ''}`

    function goThroughOrder(orderValue:number){

        console.log('orderValue:');
        console.log(orderValue);
        
        if(orderValue===0){

               authSelect += 'COUNT(rv.review_id) AS auth_review_count,';
               authFrom += 'LEFT JOIN review rv on ar.article_id = rv.article_id'
               //authGroupBy += ;


               andSelect += 'COUNT(re.review_id) AS art_review_count,';
               andFrom+= 'LEFT JOIN review re on arti.article_id = re.article_id'; 
               //andGroupBy += ', re.review_count';

               andAASelect += "|| ',' || artic.art_review_count"
               orderByArt += `ORDER BY artic.art_review_count ASC`;


               netSelect += 'COUNT(rw.review_id) AS net_review_count,';
               netFrom += 'LEFT JOIN review rw ON aar.article_id = rw.article_id';
               //netGroupBy += ', net_avg.net_review_count';
               

               andNASelect +='net_avg.net_review_count,';
               andACSelect += "',' || cte.auth_review_count ||"
               orderByAuth += `ORDER BY cte.auth_review_count ASC`;

               netGroupBy += ', net_avg.net_review_count';
               orderByNet += 'ORDER BY net_avg.net_review_count ASC'
                


        }
        else if(orderValue===1){

            authSelect += 'COUNT(rv.review_id) AS auth_review_count,';
            authFrom += 'LEFT JOIN review rv on ar.article_id = rv.article_id'
            //authGroupBy += ;


            andSelect += 'COUNT(re.review_id) AS art_review_count,';
            andFrom+= 'LEFT JOIN review re on arti.article_id = re.article_id'; 
            //andGroupBy += ', re.review_count';

            andAASelect += "|| ',' || artic.art_review_count"
            orderByArt += `ORDER BY artic.art_review_count DESC`;


            netSelect += 'COUNT(rw.review_id) AS net_review_count,';
            netFrom += 'LEFT JOIN review rw ON aar.article_id = rw.article_id';
            //netGroupBy += ', net_avg.net_review_count';
            

            andNASelect +='net_avg.net_review_count,';
            andACSelect += "',' || cte.auth_review_count ||"
            orderByAuth += `ORDER BY cte.auth_review_count DESC`;

            netGroupBy += ', net_avg.net_review_count';
            orderByNet += 'ORDER BY net_avg.net_review_count DESC'
        }
        else if(orderValue===2){

            authSelect += 'STDDEV(gr.total) as auth_stand_total,';
            //authFrom += 'LEFT JOIN review rv on ar.article_id = rv.article_id'
            //authGroupBy += ;


            andSelect += 'STDDEV(sr.total) as art_stand_total,';
            //andFrom+= 'LEFT JOIN review re on arti.article_id = re.article_id'; 
            //andGroupBy += ', re.review_count';

            andAASelect += "|| ',' || artic.art_stand_total";
            orderByArt += `ORDER BY artic.art_stand_total ASC`;


            netSelect += 'STDDEV(str.total) as net_stand_total,';
            //netFrom += 'LEFT JOIN review rw ON aar.article_id = rw.article_id';
            //netGroupBy += ', net_avg.net_review_count';
            

            andNASelect +='net_avg.net_stand_total,';
            andACSelect += "',' || cte.auth_stand_total ||"
            orderByAuth += `ORDER BY cte.auth_stand_total ASC`;

            netGroupBy += ', net_avg.net_stand_total';
            orderByNet += 'ORDER BY net_avg.net_stand_total ASC';


                
        }    
        else if(orderValue===3){
            authSelect += 'STDDEV(gr.total) as auth_stand_total,';
            //authFrom += 'LEFT JOIN review rv on ar.article_id = rv.article_id'
            //authGroupBy += ;


            andSelect += 'STDDEV(sr.total) as art_stand_total,';
            //andFrom+= 'LEFT JOIN review re on arti.article_id = re.article_id'; 
            //andGroupBy += ', re.review_count';

            andAASelect += "|| ',' || artic.art_stand_total";
            orderByArt += `ORDER BY artic.art_stand_total DESC`;


            netSelect += 'STDDEV(str.total) as net_stand_total,';
            //netFrom += 'LEFT JOIN review rw ON aar.article_id = rw.article_id';
            //netGroupBy += ', net_avg.net_review_count';
            

            andNASelect +='net_avg.net_stand_total,';
            andACSelect += "',' || cte.auth_stand_total ||"
            orderByAuth += `ORDER BY cte.auth_stand_total DESC`;

            netGroupBy += ', net_avg.net_stand_total';
            orderByNet += 'ORDER BY net_avg.net_stand_total DESC';
        }
        else if(orderValue===4){


            authSelect += 'COUNT(su.support_url_id) as auth_support_count,';
            authFrom += 'LEFT JOIN support_url su ON ar.article_id = su.article_id'
            //authGroupBy += ;


            andSelect += 'COUNT(sup.support_url_id) as art_support_count,';
            andFrom+= 'LEFT JOIN support_url sup ON arti.article_id = sup.article_id'; 
            //andGroupBy += ', re.review_count';

            andAASelect += "|| ',' || artic.art_support_count";
            orderByArt += `ORDER BY artic.art_support_count ASC`;


            netSelect += 'COUNT(sp.support_url_id) as net_support_count,';
            netFrom += 'LEFT JOIN support_url sp ON aar.article_id = sp.article_id';
            //netGroupBy += ', net_avg.net_review_count';
            

            andNASelect +='net_avg.net_support_count,';
            andACSelect += "',' || cte.auth_support_count ||"
            orderByAuth += `ORDER BY cte.auth_support_count ASC`;

            netGroupBy += ', net_avg.net_support_count';
            orderByNet += 'ORDER BY net_avg.net_support_count ASC';


               
        }
        else if(orderValue===5){
            authSelect += 'COUNT(su.support_url_id) as auth_support_count,';
            authFrom += 'LEFT JOIN support_url su ON ar.article_id = su.article_id'
            //authGroupBy += ;


            andSelect += 'COUNT(sup.support_url_id) as art_support_count,';
            andFrom+= 'LEFT JOIN support_url sup ON arti.article_id = sup.article_id'; 
            //andGroupBy += ', re.review_count';

            andAASelect += "|| ',' || artic.art_support_count";
            orderByArt += `ORDER BY artic.art_support_count DESC`;


            netSelect += 'COUNT(sp.support_url_id) as net_support_count,';
            netFrom += 'LEFT JOIN support_url sp ON aar.article_id = sp.article_id';
            //netGroupBy += ', net_avg.net_review_count';
            

            andNASelect +='net_avg.net_support_count,';
            andACSelect += "',' || cte.auth_support_count ||"
            orderByAuth += `ORDER BY cte.auth_support_count DESC`;

            netGroupBy += ', net_avg.net_support_count';
            orderByNet += 'ORDER BY net_avg.net_support_count DESC';

        }    
        else if(orderValue===6){
            orderByArt += `ORDER BY artic.article_avg ASC`;
            orderByAuth += `ORDER BY cte.author_avg ASC`;
            orderByNet += `ORDER BY net_avg.network_avg ASC`;
                

    
        }    
        else if(orderValue===7){
            orderByArt += `ORDER BY artic.article_avg DESC`;
            orderByAuth += `ORDER BY cte.author_avg DESC`;
            orderByNet += `ORDER BY net_avg.network_avg DESC`;
               

        }        
        else if(orderValue===8){

            authSelect += 'AVG(gr.like_it) as auth_like_avg,';
            
            andSelect += 'AVG(sr.like_it) as art_like_avg,';
            

            andAASelect += "|| ',' || artic.art_like_avg";
            orderByArt += `ORDER BY artic.art_like_avg ASC`;


            netSelect += 'AVG(str.like_it) as net_like_avg,';
            
            

            andNASelect +='net_avg.net_like_avg,';
            andACSelect += "',' || cte.auth_like_avg ||"
            orderByAuth += `ORDER BY cte.auth_like_avg ASC`;

            netGroupBy += ', net_avg.net_like_avg';
            orderByNet += 'ORDER BY net_avg.net_like_avg ASC';



              
        }
        else if(orderValue===9){
            authSelect += 'AVG(gr.like_it) as auth_like_avg,';
            //authFrom += 'LEFT JOIN support_url su ON ar.article_id = su.article_id'
            //authGroupBy += ;


            andSelect += 'AVG(sr.like_it) as art_like_avg,';
            //andFrom+= 'LEFT JOIN support_url sup ON arti.article_id = sup.article_id'; 
            //andGroupBy += ', re.review_count';

            andAASelect += "|| ',' || artic.art_like_avg";
            orderByArt += `ORDER BY artic.art_like_avg DESC`;


            netSelect += 'AVG(str.like_it) as net_like_avg,';
            //netFrom += 'LEFT JOIN support_url sp ON aar.article_id = sp.article_id';
            //netGroupBy += ', net_avg.net_review_count';
            

            andNASelect +='net_avg.net_like_avg,';
            andACSelect += "',' || cte.auth_like_avg ||"
            orderByAuth += `ORDER BY cte.auth_like_avg DESC`;

            netGroupBy += ', net_avg.net_like_avg';
            orderByNet += 'ORDER BY net_avg.net_like_avg DESC';

        }                
        else if(orderValue===10){
            authSelect += 'AVG(gr.s_g) as auth_sg_avg,';
            
            andSelect += 'AVG(sr.s_g) as art_sg_avg,';
            

            andAASelect += "|| ',' || artic.art_sg_avg";
            orderByArt += `ORDER BY artic.art_sg_avg ASC`;


            netSelect += 'AVG(str.s_g) as net_sg_avg,';
            
            

            andNASelect +='net_avg.net_sg_avg,';
            andACSelect += "',' || cte.auth_sg_avg ||"
            orderByAuth += `ORDER BY cte.auth_sg_avg ASC`;

            netGroupBy += ', net_avg.net_sg_avg';
            orderByNet += 'ORDER BY net_avg.net_sg_avg ASC';
        }    
        else if(orderValue===11){

            authSelect += 'AVG(gr.s_g) as auth_sg_avg,';
            
            andSelect += 'AVG(sr.s_g) as art_sg_avg,';
            

            andAASelect += "|| ',' || artic.art_sg_avg";
            orderByArt += `ORDER BY artic.art_sg_avg DESC`;


            netSelect += 'AVG(str.s_g) as net_sg_avg,';
            
            

            andNASelect +='net_avg.net_sg_avg,';
            andACSelect += "',' || cte.auth_sg_avg ||"
            orderByAuth += `ORDER BY cte.auth_sg_avg DESC`;

            netGroupBy += ', net_avg.net_sg_avg';
            orderByNet += 'ORDER BY net_avg.net_sg_avg DESC';
        
        }
    }



    if(firstDate && secondDate){
        when=`WHERE date_posted BETWEEN '${firstDate}' AND '${secondDate}'`
    }else{
        null;
    }



    if(order !==undefined){
        //orderBy += 'ORDER BY';
        console.log('order1:');
        console.log(order);
       // alsoSelect += ',';
        order.forEach(goThroughOrder);
    }
    
    // if(dates !==undefined ){
    //     caseWhen += 'CASE';
    //     console.log('caseWhen1:');
    //     console.log(caseWhen);

    //    // dates.forEach(goThroughDates);
    // }





    console.log('orderBy2:');
   // console.log(orderBy);

    console.log('andSelect:');
    console.log(andSelect);





    const client=await pool.connect();
   
    try{
        const resp=await client.query(
            `
            WITH cte AS (
                SELECT ag.article_main_url_id,
                       ag.article_main_url,
                       au.author_id, 
                       au.author_name, 
                       ${authSelect}
                       AVG(gr.total) as author_avg
                  FROM article_main_url ag
                       LEFT JOIN article ar on ar.article_main_url_id=ag.article_main_url_id
                       LEFT JOIN article_to_author ata ON ar.article_id = ata.article_id
                       LEFT JOIN author au ON ata.author_id = au.author_id 
                       LEFT JOIN star_rating gr ON ar.article_id = gr.article_id
                       ${authFrom}
                  ${when}
                    
                       
                 GROUP BY ag.article_main_url_id, ag.article_main_url, au.author_id, au.author_name ${authGroupBy}
              ),
              artic AS (
                  SELECT cte.author_id, 
                         arti.article_title, 
                         arti.article_id, 
                         arti.article_url,
                         arti.date_posted,
                         ${andSelect} 
                         AVG(sr.total) as article_avg
                  FROM cte
                       LEFT JOIN article_to_author artoau ON cte.author_id=artoau.author_id
                       LEFT JOIN article arti ON artoau.article_id=arti.article_id
                       LEFT JOIN star_rating sr ON arti.article_id = sr.article_id
                       ${andFrom}
                  ${when}     
                  GROUP BY cte.author_id, arti.article_title, arti.article_id, arti.article_url ${andGroupBy}

              ),
              arti_agg AS (
                  SELECT artic.author_id,
                         string_agg( artic.article_title || ',' ||  artic.article_id || ',' 
                         || artic.article_url || ',' || artic.date_posted || ',' || 
                         artic.article_avg ${andAASelect}, ', ' ${orderByArt}) as an_authors_articles
                  FROM artic
                  GROUP BY artic.author_id
              ),
              net_avg AS (
                  SELECT cte.article_main_url_id,
                         ${netSelect}
                         AVG(str.total) as network_avg
                  FROM cte
                  LEFT JOIN article aar ON cte.article_main_url_id = aar.article_main_url_id
                  LEFT JOIN star_rating str ON aar.article_id = str.article_id
                  ${netFrom}
                  GROUP BY cte.article_main_url_id ${netAvgGroupBy}

              )
              SELECT cte.article_main_url_id, 
                     cte.article_main_url,
                     net_avg.network_avg,
                     ${andNASelect}
                     array_agg('[' || cte.author_name || ',' || cte.author_id || ',' 
                      || cte.author_avg || ',' || '[' || arti_agg.an_authors_articles || ']' || 
                      ${andACSelect} ']' ${orderByAuth}) AS author
               FROM cte 
               LEFT JOIN arti_agg ON cte.author_id = arti_agg.author_id
               LEFT JOIN net_avg ON cte.article_main_url_id = net_avg.article_main_url_id
               GROUP BY cte.article_main_url_id, cte.article_main_url, net_avg.network_avg ${netGroupBy}
               ${orderByNet}
                
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























//   AuthorName
//   AuthorInNetwork
//   AuthorAvgRating
//   AuthorAvgLike
//   ArticlesByAuthor
//   CommonArticleTags

export async function  getAuthorInfoPage(
    author_id:string
    ):Promise<any|any>{

    console.log('inside author-dao getAuthorInfoPage:')
    console.log('author_id: '+ author_id)

    const client= await pool.connect();

    try{
        const reviewResp=await client.query(
        `
        WITH cte AS (
            SELECT au.author_id, 
                   au.author_name, 
                   amu.article_main_url,
                   amu.article_main_url_id,
                   AVG(gr.total) as avg_total,
                   AVG(gr.like_it) as avg_like,
                   AVG(gr.detail) as avg_detail,
                   AVG(gr.prose) as avg_prose,
                   AVG(gr.s_g) as avg_s_g
            FROM author au
            LEFT JOIN article_to_author at ON au.author_id=at.author_id
            LEFT JOIN article ar ON at.article_id=ar.article_id
            LEFT JOIN article_main_url amu ON ar.article_id=amu.article_id
            LEFT JOIN star_rating gr ON ar.article_id=gr.article_id
            WHERE author_id=$1
        ),
        artic AS(
            SELECT cte.author_id,
                   art.article_id,
                   art.article_name,
                   art.article_url,
                   art.date_posted,
                   AVG(rt.total) as art_avg
            FROM cte
            LEFT JOIN article_to_author ata ON cte.author_id=ata.author_id
            LEFT JOIN article art ON cte.article_id=ata.article_id
            LEFT JOIN star_rating rt ON art.article_id=rt.article_id
        )
        SELECT cte.author_id, 
               cte.author_name,
               cte.network_id,
               cte.network_name,
               cte.article_main_url,
               cte.avg_total,
               cte.avg_like,
               array_agg('[' || artic.article_id || ',' || artic.article_name || ',' || artic.article_url || ',' || artic.date_posted 
               || ','|| artic.art_avg || ']') AS articles
        FROM cte
        LEFT JOIN artic ON cte.author_id=artic.author_id
        GROUP BY cte.author_id, cte.author_name, cte.network_id, cte.network_name, cte.article_main_url, cte.avg_total, cte.avg_like
        `,
        [author_id]
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