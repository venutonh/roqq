
import { User } from '../models/user';
import  { pool }  from "../util/dbConnection/databasePool";
import  { userConverter } from "../util/converters/userConverter";


// get a user by username/password
export async function getUser(username: string, password: string){
    const client=await pool.connect();
    try {
        const resp=await client.query(`
            SELECT account_id, username, password, email, user_role FROM ers.users
            INNER JOIN ers.user_roles USING(user_role_id)
            WHERE username=$1 AND password=$2`, [username, password]);
        return resp.rows.map(userConverter);
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}

export async function getAllUsers(){
    const client=await pool.connect();
    try {
        const resp= await client.query(`
        SELECT user_id, username, password,
        email, user_role FROM ers.users
        INNER JOIN ers.user_roles USING(user_role_id)`);
        return resp.rows.map(userConverter);
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}

// get a first name and last name by userId
export async function getNameById(userId: number){
    const client=await pool.connect();
    try {
        const resp=await client.query(`
            SELECT first_name, last_name FROM ers.users 
            WHERE user_id=$1`, [userId]);
        return resp.rows[0];
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}