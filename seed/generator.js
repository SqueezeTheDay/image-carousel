const fs = require('fs');

const imageRecords = fs.createWriteStream('./seed/imageURLS.csv', { flags: 'a' });
const header = 'id,url,url,url,url,url\n';


function toDigits(digits, numbers) {
  let result = '';
  for (let i = 0; i < digits; i += 1) {
    result += '0';
  }x
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

function generateImageData() {
  let csv = '';
  for (let i = 1; i < 6; i++) {
    csv += `,http://lululemonades-related.s3.amazonaws.com/image00${toDigits(3, Math.floor(Math.random(5) * 100) + 1)}.jpg`;
  }
  return csv;
}

imageRecords.write(header);
let imageData = [];

for (let i = 0; i <= 10e6; i += 1) {
  const record = i + '';
  const urls = generateImageData();
  const onerecord = record + urls + '\n';
  imageData.push(onerecord);
  if (i % 500000 === 0) {
    console.log(i, ' records');
    imageRecords.write(imageData.join(''));
    imageData = [];
  }
}

imageRecords.end()