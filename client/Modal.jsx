import React from 'react';
import ModalThumbnails from './ModalThumbnails.jsx';

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrls: this.props.urlsList,
      imageZoomStyles: {
        position: 'absolute',
        top: '-300px',
        left: '-300px',
      },
      imageContainerStyles: {
        width: '81%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      },
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0
    }
    this.selectFunction = this.selectFunction.bind(this)
    this.dragMouseDown = this.dragMouseDown.bind(this)
    this.closeDragElement = this.closeDragElement.bind(this)
    this.elementDrag = this.elementDrag.bind(this)
  }
  selectFunction(e) {
    document.getElementById('zoom-view').setAttribute('src', e.target.src)
  }
  dragMouseDown(e) {
    e = e || window.event
    this.setState({pos3: e.clientX, pos4: e.clientY})
    document.onmouseup = this.closeDragElement
    document.onmousemove = this.elementDrag
  }
  elementDrag(e) {
    e = e || window.event
    this.setState({pos1: this.state.pos3 - e.clientX, pos2: this.state.pos4 - e.clientY, pos3: e.clientX, pos4: e.clientY})
    document.getElementById('zoom-view').style.top = (document.getElementById('zoom-view').offsetTop - this.state.pos2) + 'px'
    document.getElementById('zoom-view').style.left = (document.getElementById('zoom-view').offsetLeft - this.state.pos1) + 'px'
  }
  closeDragElement() {
    document.onmouseup = null
    document.onmousemove = null
  }
  handleDragStart(e) {
    e.preventDefault()
  }
  render() {
    return(
      <div style={this.props.styles}>
        <div id="modal">
          <div id="window">
            <span onClick={this.props.closeModal} id="close-modal">&#10005;</span>
            <ModalThumbnails imageUrls={this.props.urlsList} imageSelect={this.selectFunction}/>
            <div style={this.state.imageContainerStyles}>
              <img onDragStart={this.handleDragStart} onMouseDown={this.dragMouseDown} id="zoom-view" style={this.state.imageZoomStyles} src={this.state.imageUrls[this.props.imageIndex]} width="1290px" height="1740px" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// Export the Modal class from here
export default Modal
