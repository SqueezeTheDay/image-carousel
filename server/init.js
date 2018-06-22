const handler = require('./request-handler');
const path = require('path');
const models = require('./models');

const { Image, Product } = models;

function parseTabSeparatedValues(text) {
  let body = '';
  body += text;
  const rows = body.trim().split('\n');
  const headers = rows.shift().split('\t');
  const table = rows.map((row) => {
    const result = {};
    const cells = row.split('\t');
    headers.forEach((header, index) => {
      result[header] = cells[index];
    });
    return result;
  });
  return table;
}

handler.read(path.join(__dirname, '/products.txt'), (data) => {
  const items = parseTabSeparatedValues(data);
  items.forEach((item, index) => {
    const product = Object.assign({ _id: item.id }, item);
    delete product.id;
    const id = index + 1;
    function toDigits(digits, numbers) {
      let result = '';
      for (let i = 0; i < digits; i += 1) {
        result += '0';
      }
      const numbersArray = numbers.toString().split('');
      if (digits > numbersArray.length) {
        numbersArray.forEach((number) => {
          result = result.slice(1, result.length);
          result += number;
        });
      } else if (digits === numbersArray.length) {
        result += numbers;
      }
      return result;
    }
    
    const imageInfo = {
      _id: id,
      urls: [{ url: `http://lululemonades-related.s3.amazonaws.com/image00${toDigits(3, id)}.jpg` },
        { url: `http://lululemonades-related.s3.amazonaws.com/image00${toDigits(3, Math.floor(Math.random(id) * 100) + 1)}.jpg ` },
        { url: `http://lululemonades-related.s3.amazonaws.com/image00${toDigits(3, Math.floor(Math.random(id) * 100) + 1)}.jpg` },
        { url: `http://lululemonades-related.s3.amazonaws.com/image00${toDigits(3, Math.floor(Math.random(id) * 100) + 1)}.jpg` },
        { url: `http://lululemonades-related.s3.amazonaws.com/image00${toDigits(3, Math.floor(Math.random(id) * 100) + 1)}.jpg` }],
    };
    const newProduct = new Product(product);
    const newImage = new Image(imageInfo);
    newProduct.save((err) => { if (err) throw new Error(err); });
    newImage.save((err) => { if (err) throw new Error(err); });
  });
});
