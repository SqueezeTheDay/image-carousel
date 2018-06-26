const express = require('express');
const models = require('./models');
const cors = require('cors');

const { Image, Product } = models;
const app = express();
app.use(cors());


app.use('/:id', express.static('./public'));


//read
app.get('/images/:id', (req, res) => {
  const { id } = req.params;
  const result = [];
  Product.find({ _id: id }, (err, data) => {
    if (err) throw new Error(err);
    result.push(data[0]);
  })
    .then(() => {
      Image.find({ _id: id }, (err, data) => {
        if (err) throw new Error(err);
        result.push(data[0]);
      })
        .then(() => {
          res.end(JSON.stringify(result));
        });
    });
});

// create
app.post('images/', (req, res) => {
  // add new product item
  // add new images
  Images.create(req.body, (err, data) => {
    if (err) throw new Error(err);
  })

});


// update
app.put('images/:id', (req, res) => {
  // add the id to the request
});

// delete
app.delete('images/:id', (req, res) => {
  // delete the element at the given ID
  const { id } = req.params;
  Images.deleteOne({ _id: id });

});

app.listen(3004);

