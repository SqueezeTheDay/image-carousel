import Carousel from './Carousel.jsx';
import ReactDOM from 'react-dom';
import React from 'react';

fetch('/products/98/images').then(response => response.json().then(body => {
  var details = Object.values(body[0])
  details.shift()
  details.pop()
  details.pop()
  var images = body[1].urls.map(url => url.url)
  ReactDOM.render(<Carousel productType={details} images={images}/>, document.getElementById('carousel'))
}))
