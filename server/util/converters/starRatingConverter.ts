import { SqlStarRating} from "../../dto/sql-starRating";
import { StarRating } from "../../models/starRating";


export function starRatingConverter(r: SqlStarRating){
    return new StarRating(
        r.rate_id,
        r.detail,
        r.prose,
        r.s_g,
        r.like_it,
        r.total,
        


    );
}