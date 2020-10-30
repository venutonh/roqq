import { SqlArticleAvg } from "../../dto/sql-articleAvg";
import { ArticleAvg } from "../../models/articleAvg";

export function articleAvgConverter(avg:SqlArticleAvg){
    return new ArticleAvg(
        avg.total_avg,
        avg.detail_avg,
        avg.prose_avg,
        avg.s_g_avg,
        avg.like_avg
    );

}