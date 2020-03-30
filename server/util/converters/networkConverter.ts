import { SqlNetwork } from "../../dto/sql-network";
import { Network } from "../../models/network";

export function userConverter(n: SqlNetwork){
    return new Network(
        n.network_id,
        n.network_name
        
        );

}



