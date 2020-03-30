const { Pool } = require('pg');
const LocalDbConfig = require('./localConfig');

export const pool = new Pool(LocalDbConfig);

//console.log("look here dumbass");
//pool.query('SELECT * FROM article', (error:any, response:any) => {
  //if (error) return console.log('error', error);

  

  //console.log('response.rows', response.rows);
//});

//module.exports = pool;

