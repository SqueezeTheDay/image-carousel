import React from 'react'

class Thumbnails extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    var images = [];
    this.props.imageUrls.forEach((image, index) => {
      const splitUrl = image.split('/');
      const getFileName = splitUrl[splitUrl.length - 1].split('?');
      const getImageName = getFileName[0].split('.')[0];
      const el = (
        <a key={index} href={`#${getImageName}`}>
          <img alt="" id={index} src={image} width="67px" height="83px" />
        </a>
      );
      images.push(el);
    });
    return (
      <div className="thumbnails">
        {images}
      </div>
    );
  }
}

export default Thumbnails;
