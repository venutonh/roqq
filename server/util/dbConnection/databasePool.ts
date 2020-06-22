const { Pool } = require('pg');
const LocalDbConfig = require('./localConfig');

export const pool = new Pool({
  user: 'roqq_user',
  host: 'localhost',
  database: 'roqqdb',
  password: 'jackass000',
  port: 5432
});

//console.log("look here dumbass");
//pool.query('SELECT * FROM article', (error:any, response:any) => {
  //if (error) return console.log('error', error);

  

  //console.log('response.rows', response.rows);
//});



