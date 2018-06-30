const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();

const app = express();
app.use(cors());

const db = pgp('postgres://localhost:5432/lululemon');

const Product = {
  _id: '1',
  gender: 'Women',
  category: 'Tops',
  type: 'Shirts',
  colors: 'red, blue, pink',
  __v: 0,
};

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

      images.urls[0].url = data[0].url_one;
      images.urls[1].url = data[0].url_two;
      images.urls[2].url = data[0].url_three;
      images.urls[3].url = data[0].url_four;
      images.urls[4].url = data[0].url_five;
      result.push(images);
      res.end(JSON.stringify(result));
    });
});

//update
//create


//delete
app.delete('/images/:id', (req, res) =>{
  const { id } = req.params;
  console.log('that was a delete!')
  db.result(`DELETE FROM image_urls WHERE id = ${id};`)
    .then((result) => {
      console.log(result.rowCount);
    })
    .catch((error) => {
      console.log('ERROR:', error);
    });
});


app.listen(3004);
