import React from 'react'
import vsbl from 'vsbl'
import cx from 'classnames'
import { client } from '../util/client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

class Image extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      src: this.props.source ? `${/insta/.test(this.props.source) ? this.props.source : `${this.props.source}`}` : null,
      visible: false,
      loaded: false,
      mounted: false
    }

    this.vs = null

    this.image = React.createRef()
  }

  componentDidMount() {
    if (!this.props.defer) {
      setTimeout(() => {
        this.setState({
          mounted: true
        })
      }, this.props.timeOut || 200)
    }
    this.vs = vsbl(this.image.current)(() => {
      if (this.state.visible) return
      if (this.props.defer) {
        this.setState({
          mounted: true
        })
      }
      setTimeout(() => {
        this.setState({
          visible: true
        })
      }, 400)
    })

    this.vs.update() // on page load
  }
  componentWillUnmount() {
    this.vs.destroy()
  }

  render() {
    const { src, visible, loaded, mounted } = this.state
    const { imageId } = this.props

    let imageSrc = src
    if (imageId) {
      // Replicate maxWidth: 500 from original
      imageSrc = urlFor(imageId).width(500).url()
    }

    return (
      <div className={cx(`x y image__block block ${this.props.className}`, {
        'background': src && /jpg/.test(src),
        'is-visible': visible
      })} ref={this.image}>
          <img
            alt={this.props.alt}
            src={mounted ? imageSrc : null}
            className={cx(`x y block`, {
              'is-loaded': loaded,
              'is-visible': visible
            })}
            onLoad={() => {
              this.setState({
                loaded: true
              })
            }} />
      </div>
    )
  }
}

export default Image
