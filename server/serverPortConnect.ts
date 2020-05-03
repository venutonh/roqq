const app = require('./index');



const port=7777;

app.set('port', port);


const server = app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
  });