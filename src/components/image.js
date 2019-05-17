import React from 'react'
import vsbl from 'vsbl'
import cx from 'classnames'

import Img from 'gatsby-image'
import { getFluidGatsbyImage } from 'gatsby-source-sanity'

const sanityConfig = { projectId: 'xq1bjtf4', dataset: 'production' }

class Image extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      src: `${/insta/.test(this.props.source) ? this.props.source : `${this.props.source}`}`,
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
    const { imageId, size } = this.props

    let fluidProps
    if (imageId) {
      fluidProps = getFluidGatsbyImage(imageId, { maxWidth: 500 }, sanityConfig)
    }

    return (
      <div className={cx(`x y image__block block ${this.props.className}`, {
        'background': /jpg/.test(src),
        'is-visible': visible
      })} ref={this.image}>
        {fluidProps ? (
          <Img fluid={fluidProps} />
        ) : (
            <img
              alt={this.props.alt}
              src={mounted ? src : null}
              className={cx(`x y block`, {
                'is-loaded': loaded,
                'is-visible': visible
              })}
              onLoad={() => {
                this.setState({
                  loaded: true
                })
              }} />
          )}
      </div>
    )
  }
}

export default Image
