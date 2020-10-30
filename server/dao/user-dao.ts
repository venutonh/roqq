
import { User } from '../models/user';
import { pool }  from "../util/dbConnection/databasePool";
import { userConverter } from "../util/converters/userConverter";
import { SqlUser } from '../dto/sql-user';
//import { stringify } from 'querystring';


export async function createUser(
    username: string, 
    password_hash: string, 
    email: string,
    accountTypeId: number
    ): Promise<number | any> {
    const client=await pool.connect();
        accountTypeId =1;
    console.log(username, password_hash, email, accountTypeId);
        
    try {
        const resp=await client.query(
            `
            INSERT INTO account 
            (username,password_hash,email,account_type_id)
            VALUES ($1,$2,$3,$4)
            returning account_id
            `,
            [
                username,
                password_hash,
                email,
                accountTypeId
            ]);
        console.log(resp);
        console.log(resp.rows[0]);
        return resp.rows[0].account_id;
    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
    client.release();
    }
}


    




// get a user by email/password
export async function getUser(
    password_hash: string, 
    email: string
    
    ): Promise<User | any> {
     
    const client=await pool.connect();
   
    try {
        const resp=await client.query(
            `
            SELECT account_id, username, 
            password_hash, account_type_id
            FROM account
            WHERE password_hash=$1 AND email=$2
            `, 
            [password_hash, email]
            );
            

            return (resp.rows[0]);
            //return resp.rows[0].account_id;
            
    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
        client.release();
    }
}





export async function getAllUsers(): Promise<User[] | any>{
    const client=await pool.connect();
    try {
        const resp= await client.query(`
            SELECT account_id, username, password_hash,
            email, account_type_id FROM account
            `);

        const users: User[] = [];
        resp.rows.forEach((userResult: SqlUser) => {
            //console.log(userResult);
            users.push(userConverter(userResult))
        });
        return users;
    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
        client.release();
    }
}




 

// get a user by userId
export async function getUserById(account_id: number): Promise<User | any>{
    const client=await pool.connect();
    
    try {
        const resp=await client.query(`
            SELECT account_id, username, password_hash, 
            email, account_type_id
            FROM account
            WHERE account_id=$1`, 
            [account_id]);
 
        const user = userConverter(resp.rows[0]);
        return user;
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}


// ),
//             ur AS (
//                 SELECT article_id, review_id
//                 FROM review
//                 WHERE account_id=$1
//             ),
//             uv AS (
//                 SELECT article_id, review_id
//                 FROM review_vote
//                 WHERE account_id=$1
//             )
//             SELECT cte.account_id,
//                    cte.username,
//                    cte.email,
//                    cte.account_type_id,
//                    array_agg('{' || ur.article_id || ',' || ur.review_id || '}') AS user_reviews, 
//                    array_agg('{' || uv.article_id || ',' || uv.review_id || '}') AS user_votes
//             FROM cte
//             LEFT JOIN ur ON ur.account_id=cte.account_id
//             LEFT JOIN uv ON uv.account_id=cte.account_id
//             GROUP BY cte.account_id, cte.username, cte.email, cte.account_type_id





  // get a user by username
export async function getUserByUsernameAndId(
    username: string, 
    account_id: number

    ): Promise<User | any> {

        console.log("inside user-dao getUserByUsernameAndId")

        console.log('account_id:')
        console.log(account_id)

        console.log('typeof account_id:')
        console.log(typeof account_id)


        account_id=Number(account_id);

        console.log('typeof account_id:')
        console.log(typeof account_id)

        
    const client=await pool.connect();
    try {
        const userInfo=await client.query(
            `
            WITH cte AS(
                SELECT account_id, username, email, account_type_id
                FROM account
                WHERE username=$1 and account_id=$2
                ),
                ur AS (
                                     SELECT article_id, review_id, account_id
                                     FROM review
                                     WHERE account_id=$2
                                 ),
                                 uv AS (
                                     SELECT article_id, review_id, account_id, review_vote
                                     FROM review_vote
                                     WHERE account_id=$2
                                 )
                                 SELECT cte.account_id,
                                        cte.username,
                                        cte.email,
                                        cte.account_type_id,
                                        array_agg('{' || '"articleId": ' || ur.article_id || ',' || '"reviewId": ' || ur.review_id || '}') AS user_reviews, 
                                        array_agg('{' || '"articleId": ' || uv.article_id || ',' || '"reviewId": ' || uv.review_id || 
                                        '"voteValue": ' || review_vote || '"time": ' || timestamped || '}') AS user_votes
                                 FROM cte
                                 LEFT JOIN ur ON ur.account_id=cte.account_id
                                 LEFT JOIN uv ON uv.account_id=cte.account_id
                                 GROUP BY cte.account_id, cte.username, cte.email, cte.account_type_id
                    
            
            `,
            [username, account_id]
            );  
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
                console.log('userInfo.rows[0]:')
                console.log(userInfo.rows[0])
                const user = userConverter(userInfo.rows[0]);
                console.log('user:')
                console.log(user)
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')

        // const userEligibility=await client.query(
        //     `
        //     WITH ur AS (
        //         SELECT article_id, review_id
        //         FROM review
        //         WHERE account_id=$1
        //     ),
        //     uv AS (
        //         SELECT article_id, review_id
        //         FROM review_vote
        //         WHERE account_id=$1
        //     )
        //     SELECT array_agg('[' || ur.article_id || ',' || ur.review_id || ']') AS user_reviews, 
        //     array_agg('[' || uv.article_id || ',' || uv.review_id || ']') AS user_votes
        //     FROM ur
        //     LEFT JOIN uv ON uv.account_id=ur.account_id
        //     `,
        //     [account_id]
        //);
                  
            return user;
                // userReviews:userEligibility.user_reviews,
                // userVotes:userEligibility.user_votes
            
            
    } catch (error) {
        console.log(error);
        //return error.message;

    } finally {
        client.release();
    }
}




 // get a user by username
 export async function getEligibility(
    username: string, 
    account_id: number

    ): Promise<User | any> {

    const client=await pool.connect();
    try {
        const resp=await client.query(
            `
            SELECT account_id, username, email, account_type_id
            FROM account
            WHERE username=$1 and account_id=$2
            `, 
            [username, account_id]
            );  
                
                const user = userConverter(resp.rows[0]);
                  
            return user;
            
    } catch (error) {
        console.log(error);
        //return error.message;

    } finally {
        client.release();
    }
}
