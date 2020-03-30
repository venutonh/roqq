import { SqlSupport } from "../../dto/sql-support";
import { Support } from "../../models/support";

export function supportConverter(s: SqlSupport){
    return new Support(
        s.support_url_id,
        s.support_url
        );
}