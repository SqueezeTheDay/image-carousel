require('newrelic');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const { Configs } = require('../config');
const path = require('path');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const db = pgp(Configs);

  const Product = {
    _id: '1',
    gender: 'Women',
    category: 'Tops',
    type: 'Shirts',
    colors: 'red, blue, pink',
    __v: 0,
  };

  app.use('/', express.static(path.join(__dirname, '../public')));

  app.use('/:id', express.static('./public'));

  app.get('/images/:id', (req, res) => {
    const { id } = req.params;
    const result = [];
    result.push(Product);

    db.query(`SELECT * FROM image_urls WHERE id = ${id};`)
      .then((data) => {
        const images = {
          urls: [
            { url: '' },
            { url: '' },
            { url: '' },
            { url: '' },
            { url: '' }],
        };
        if (data[0]) {
          images.urls[0].url = data[0].url_one;
          images.urls[1].url = data[0].url_two;
          images.urls[2].url = data[0].url_three;
          images.urls[3].url = data[0].url_four;
          images.urls[4].url = data[0].url_five;
          result.push(images);
          res.end(JSON.stringify(result));
        }
        res.end();
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  });

  // update


  // create
  app.post('/images/', (req, res) => {
    console.log('the post function is running');

    db.none(`
      INSERT INTO image_urls(
      url_one, 
      url_two, 
      url_three, 
      url_four, 
      url_five) 
      VALUES(
         '${req.body.url_one}',
         '${req.body.url_two}',
         '${req.body.url_three}',
         '${req.body.url_four}',
         '${req.body.url_five}'
       )`)
      .then(() => {
        console.log('items have been added to the database');
        res.end();
      })
      .catch((error) => {
        console.error(error);
      });

    res.end();
  });

  // delete
  app.delete('/images/:id', (req, res) =>{
    const { id } = req.params;
    db.result(`DELETE FROM image_urls WHERE id = ${id};`)
      .then((result) => {
        console.log(result.rowCount + ' items have been deleted');
        res.end();
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  });


  app.listen(3004, console.log('listening on 3004'));

}

