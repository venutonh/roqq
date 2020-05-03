import { Comment } from '../models/comment';
import  { pool }  from "../util/dbConnection/databasePool";
import  { userConverter } from "../util/converters/userConverter";



export async function getAllCommentsFromUser(username:string): Promise<Comment[] | any> {
    const client = await pool.connect();
    try{
        const resp = await client.query(
            `
            SELECT * FROM comment
            WHERE 
            `,
            [username]);
        const users: Comment[] = [];
        resp.rows.map((user_result:Comment) => {
            users.push(user_result);
        })
      return users;    
    } catch (error) {
        console.log(error);
        //return error.message;
    } finally {
    client.release();
    }
   
}

