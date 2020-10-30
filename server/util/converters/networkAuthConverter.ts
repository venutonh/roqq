import { SqlNetworkAuthors } from "../../dto/sql-networkAuth";
import { NetworkAuthors } from "../../models/networkAuth";

export function networkAuthConverter(n: SqlNetworkAuthors){
    return new NetworkAuthors(
        n.article_main_url_id,
        n.article_main_url,
        n.author

        
        );

}



