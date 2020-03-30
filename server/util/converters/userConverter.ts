import { SqlUser } from "../../dto/sql-user";
import { User } from "../../models/user";

export function userConverter(u: SqlUser){
    return new User(
        u.user_id,
        u.username,
        u.password,
        u.email
        
        );

}