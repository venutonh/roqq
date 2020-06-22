import { pool }  from "../util/dbConnection/databasePool";
import { articleConverter } from "../util/converters/articleConverter";
import { articleIdConverter } from "../util/converters/articleIdConverter";
import { parseUrl, articleScanner  } from "../controllers/scanner";




export async function findArticle(
    url: string
    ): Promise<object |any>{
    const parsedUrl: any = parseUrl(url);

    const article_main_url: string = parsedUrl.article_main_url;
    const article_url: string = parsedUrl.article_url;
  

    const client=await pool.connect();

    try{
        const resp=await client.query(
            `
            SELECT * FROM article a 
            LEFT JOIN author c ON a.author_id = c.author_id
            LEFT JOIN article_main_url b ON a.article_main_url_id = b.article_main_url_id 
            WHERE article_main_url=$1 and article_url=$2
            `, 
            [article_main_url, article_url]

        );     
        
        if(resp.rows[0]===undefined){

           const article = await articleScanner(url, article_main_url, article_url);
        
           return article;
        }
        else{
            const articleId = articleIdConverter(resp.rows[0]);
            //console.log('articleId:');
            //console.log(articleId);
            //const article = articleConverter(resp.rows[0]);
            return articleId;
        }
    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
    client.release();
    }
}






export async function saveArticle(
    //article_id:number,
    article_title:string,
    author_id:number,
    article_url:string,
    article_main_url_id:number
    //article_divider_url_id:number
    ):Promise<any|any>{

    console.log('inside saveArticle');

    const client=await pool.connect();
    
    try{
        const resp=await client.query(
            `
            INSERT INTO article
            (article_title, author_id, article_url, 
            article_main_url_id)
            VALUES ($1,$2,$3,$4)
            returning article_id, article_title, 
            author_id, article_url, article_main_url_id
            `,
            [
                article_title, 
                author_id,
                article_url,
                article_main_url_id
            ]);
        const article = articleConverter(resp.rows[0])
        
        console.log("YYYYYYYEEEEEEEEEEEEEEEEEESSSSSSSSSSSSSSS");

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



// export async function getAuthorId(
//     author:string
//     ):Promise<any|any>{

//     const client=await pool.connect();
    
//     try{
//         const resp=await client.query(
//             `SELECT author FROM article
//             WHERE author = $1
//             RETURNING author_id
//             `,
//             [author]
//         );

//         return resp.rows[0].author_id;


//     } catch (error) {
//         console.log(error);
//         //return error.message;
//     } finally {
//     client.release();
//     }
// }








// export async function saveAuthor(
//     author:string
//     ):Promise<any|any>{

//     const client=await pool.connect();
    
//     try{
//         const resp=await client.query(
//             `
//             INSERT INTO author
//             (author_name)
//             WHERE author = $1
//             `,
//             [author]
//         );

//         return resp.rows[0].author_id;

//     } catch (error) {
//         console.log(error);
//         //return error.message;
//     } finally {
//     client.release();
//     }
// }




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

         return resp.rows[0].article_main_url_id;


     } catch (error) {
         console.log(error);
         //return error.message;
     } finally {
         client.release();
     }
 }




export async function getOrSaveAuthor(
    author_name:string
    ):Promise<any|any>{

    console.log('inside getOrSaveAuthor');

    const client=await pool.connect();
    
    try{
        const respA=await client.query(
            `SELECT author_id FROM author
            WHERE author_name = $1
            `,
            [author_name]
        
        );
        console.log("respA.rows[0]: "+respA.rows[0]);
        console.log("author: " + author_name);

         if(respA.rows[0]){
            console.log("author2: " + author_name);
            return respA.rows[0].author_id;

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
                return respB.rows[0].author_id;


        }


    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
    client.release();
    }
}





// export async function getNetworkExists(
//     article_main_url:string

//     ):Promise<any|any>{

//     const client=await pool.connect();
    
//     try{
//         const resp=await client.query(
//             `SELECT article_main_url_id FROM article_main_url
//             WHERE article_main_url = $1
//             returning article_main_url_id
//             `,
//             [article_main_url]
//         );

//         return resp.rows[0].article_main_url_id;


//     } catch (error) {
//         console.log(error);
//         //return error.message;
//     } finally {
//     client.release();
//     }
// }

