import { SqlUser } from "../../dto/sql-user";
import { User } from "../../models/user";

export function userConverter(u: SqlUser){
    return new User(
        u.account_id,
        u.username,
        u.password_hash,
        u.email,
        u.account_type_id
        
        );

}