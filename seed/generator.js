const fs = require('fs');

const imageRecords = fs.createWriteStream('./imageURLS.csv', { flags: 'a' });
const header = 'url1,url2,url3,url4,url5\n';


const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

function generateImageData() {
  let csv = '';
  for (let i = 1; i < 6; i++) {
    if (i === 1) {
      csv += 'http://lululemonades-related.s3.amazonaws.com/image' + `${getRandomInt(100) + 1}.jpg`.padStart(9, '0');   
    } else {
      csv += ',http://lululemonades-related.s3.amazonaws.com/image' + `${getRandomInt(100) + 1}.jpg`.padStart(9, '0');
    }
  }
  return csv;
}

imageRecords.write(header);
let imageData = [];

for (let i = 0; i <= 10e6; i += 1) {

  const urls = generateImageData();
  const onerecord = urls + '\n';
  imageData.push(onerecord);
  if (i % 500000 === 0) {
    console.log(i, ' records');
    imageRecords.write(imageData.join(''));
    imageData = [];
  }
}

imageRecords.end();
