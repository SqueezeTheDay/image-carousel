import Carousel from './Carousel.jsx';
import ReactDOM from 'react-dom';
import React from 'react';

fetch('/images' + window.location.pathname).then(response => response.json().then(body => {
  console.log(body);
  var details = Object.values(body[0])
  details.shift()
  details.pop()
  details.pop()
  var images = body[1].urls.map(url => url.url)
  ReactDOM.render(<Carousel productType={details} images={images}/>, document.getElementById('carousel'))
}));
