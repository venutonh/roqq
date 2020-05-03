
import { User } from '../models/user';
import { pool }  from "../util/dbConnection/databasePool";
import { userConverter } from "../util/converters/userConverter";
import { SqlUser } from '../dto/sql-user';






export async function createUser(
    username: string, 
    password_hash: string, 
    email: string,
    accountTypeId: number
    ): Promise<number | any> {
    const client=await pool.connect();
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


    




// get a user by username/password
export async function getUser(
    password_hash: string,
    email: string
    
): Promise<User | any> {
    const client=await pool.connect();
    try {
        const resp=await client.query(`
            SELECT account_id, username, password_hash, 
            email, account_type_id
            FROM account
            WHERE username=$1 AND password_hash=$2
            `, 
            [password_hash, email]);
            //console.log("Fuck1");
    
        /* const user: User[] = [];
        resp.rows.forEach((userResult: SqlUser) => {
            console.log(userResult);
            user.push(userConverter(userResult))
        }); */
                //console.log(resp);
                //console.log(resp.rows[0]);
                console.log(userConverter(resp.rows[0]));
                //const user: User = new User;
                const user = (userConverter(resp.rows[0]));
                //console.log(user);
                //console.log(resp.rows.push(userConverter)); 
            //console.log(user);
            return user;
    } catch (error) {
        //console.log("Fuck2");
        console.log(error);
        //return error.message;

    } finally {
        client.release();
    }
}


export async function getUserIdByUsername(
    username: string
): Promise<number | any>{
    const client=await pool.connect();
    try {
        const resp=await client.query(`
            SELECT account_id, username FROM account
            WHERE username=$1
            `,
            [username]);
            console.log('resp.rows: ' +resp.rows[0]);
            console.log('resp.rows.account_id: ' +resp.rows[0].account_id);
            return resp.rows[0].account_id;
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

        //console.log(resp);
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
    console.log(account_id);
    try {
        const resp=await client.query(`
            SELECT account_id, username, password_hash, 
            email, account_type_id
            FROM account
            WHERE account_id=$1`, 
            [account_id]);

        console.log(resp); 
        console.log(resp.rows[0]);    
        const user = userConverter(resp.rows[0]);
        return user;
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}






/* export async function findByUsernameAndPassword(
    username: string,
    password_hash: string
  ): Promise<User | any>{
    const client = await pool.connect();
    const nullUser: any = null;
    try {
      const resp = await client.query(
        `
        SELECT * FROM account
        NATURAL JOIN account_type_id
        WHERE username = $1
        AND password_hash = $2`,
        [username, password_hash]
      );
      if (resp.rows.length !== 0) {
        return userConverter(resp.rows[0]);
      }
      return nullUser;
    } catch (error) {
        console.log(error);
    } finally {
      client.release();
    }
  } */