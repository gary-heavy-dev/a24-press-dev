import React from 'react'
import { client } from '../util/client'
import MicroModal from 'micromodal'

import SwiperCore, { Thumbs, Navigation, A11y } from 'swiper'
import ItemContent from './itemContent.js'
SwiperCore.use([Thumbs, Navigation, A11y]);

class Film extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film: null,
    }
  }

  componentDidMount() {
    const queryFilm = `*[slug.current == '${this.props.slug}'] {
      ...,
      'image': poster.asset->url,
      'imageId': poster.asset->_ref,
      imagePreviews[] {
        ...,
        'image': asset->url
      },
      fileDownloads[] {
        ...,
        'download': file.asset->url,
        'file': file.asset->,
        'image': vimeoImage.asset->url
      },
      clipDownloads[] {
        ...,
        'download': file.asset->url,
        'file': file.asset->,
        'image': vimeoImage.asset->url
      }
    }`
    client
      .fetch(queryFilm)
      .then(res => {
        this.setState({
          film: res[0]
        })
      })
      .catch(err => {
        console.log('error', err)
      })
  }
  openModal(domModal) {
    const Plyr = require('plyr')
    MicroModal.show(domModal)
    const videoPlayer = new Plyr(`#vimeo-${domModal}`, {
      autopause: true,
      vimeo: {
        controls: true,
        autoplay: false
      }
    })
    this.setState({
      video: videoPlayer
    })
  }
  closeModal(domModal) {
    MicroModal.close(domModal)
    this.state.video.pause()
  }


  render() {
    const { film } = this.state

    return (
      <div>
        {film ? (
          <ItemContent item={film} />
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default Film
