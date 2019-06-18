import React from 'react'

const pct = num => `${num * 100}%`

function getHlStyle({ bounding_box: bb }) {
  return {
    top: pct(bb[1]),
    left: pct(bb[0]),
    width: pct(bb[2] - bb[0]),
    height: pct(bb[3] - bb[1]),
  }
}

class ImageView extends React.Component {
  input = null

  state = {
    value: '',
  }

  setValueFromIndex = index => {
    const { fields } = this.props
    const value = fields.length ? fields[index].value : ''
    this.setState({ value: value || '' })
    this.input && this.input.focus()
  }

  componentDidMount() {
    this.setValueFromIndex(this.props.activeIndex)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeIndex !== this.props.activeIndex) {
      this.setValueFromIndex(nextProps.activeIndex)
    }
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleKeyUp = e => {
    switch (e.key) {
      case 'Enter':
        return this.handleEnter()
      case 'Down':
      case 'ArrowDown':
        return this.props.moveBy(1)
      case 'Up':
      case 'ArrowUp':
        return this.props.moveBy(-1)
      default:
        return
    }
  }

  handleEnter = () => {
    this.props.onEnter(this.state.value)
    this.props.moveBy(1)
  }

  render() {
    const { fields, image, activeIndex } = this.props

    if (fields.length === 0) return null

    const currentField = fields[activeIndex]
    const hlStyle = getHlStyle(currentField)
    const fieldStyle = {}

    return (
      <div className="image-view">
        <img className="document-image" src={image} alt="img" />
        <div className="overlay">
          <div className="highlight" style={hlStyle}></div>
          <div className="active-field" style={fieldStyle}>
            <div className="flex">
              <input
                type="text"
                ref={input => (this.input = input)}
                onChange={e => this.handleChange(e)}
                onKeyUp={e => this.handleKeyUp(e)}
                value={this.state.value}
              />
            </div>
            <div className="flex">
              <span>{currentField.name}</span>
              <button onClick={this.handleEnter}>Submit (Enter)</button>
            </div>
            <div className="hotkeys">
              <div>
                <code>Up&uarr;</code> previous
              </div>
              <div>
                <code>Down&darr;</code> next
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageView
