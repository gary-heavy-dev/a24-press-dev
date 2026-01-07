import React from 'react'
import {client} from '../util/client.js'
import MicroModal from 'micromodal'
import SwiperCore, { Thumbs, Navigation, A11y } from 'swiper'
import ItemContent from './itemContent.js'

SwiperCore.use([Thumbs, Navigation, A11y]);

class Book extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      book: null,
    }
  }

  componentDidMount() {
    const queryBook = `*[slug.current == '${this.props.slug}'] {
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
      .fetch(queryBook)
      .then(res => {
        this.setState({
          book: res[0]
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
    const { book } = this.state

    return (
      <div>
        {book ? (
          <ItemContent item={book} />
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default Book
