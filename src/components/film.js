import React from 'react'
import { Link } from '@reach/router'
import sanityClient from '@sanity/client'
import BlockContent from '@sanity/block-content-to-react'
import {
  IoIosCloudDownload
} from 'react-icons/io'
import cx from 'classnames'

import Image from './image.js'

const client = sanityClient({
  projectId: 'xq1bjtf4',
  dataset: 'production',
  useCdn: false // `false` if you want to ensure fresh data
})

class Loading extends React.Component {
  constructor() {
    super()
    this.film = React.createRef()
    this.state = {
      loaded: false
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loaded: true
      })
    }, 300)
  }
  render() {
    return (
      <div ref={this.film} className={cx('film__single', {
        'loaded': this.state.loaded
      })}>
        {this.props.children}
      </div>
    )
  }
}

class Film extends React.Component {
  constructor() {
    super()
    this.state = {
      film: null
    }
  }
  componentDidMount() {
    console.log('taco')
    console.log('this.prosp', this.props.slug)
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
        'download': file.asset->url
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
  componentWillReceiveProps(props) {
    console.log('state updated?')
  }
  render() {
    const {
      film
    } = this.state
    return (
      <div>
        {film ? (
          <Loading>
            <div className='x film'>
              <Link to="/" className='film__back f jcs aic'>
                <svg fill='currentColor' className='ml1 rotate' version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 55 20"><polygon fillRule='evenodd' clipRule='evenodd' points="43.3,0 55,10 43.3,20 42.4,19.1 52.2,10.7 0,10.7 0,9.3 52.2,9.3   42.4,0.9 43.3,0 " /></svg>
                <h5 className='p0 my0 pl1 bcb rel z1'>Back</h5>
              </Link>
            </div>
            <div className='x py1 film__content'>
              <div className='f jcb ais'>
                <div className='rel x film__poster'>
                  <a className='abs top z2 left x y' href={`${film.image}?dl=${film.poster.asset._ref}`} />
                  <div className='abs z1 film__images-single-icon'>
                    <IoIosCloudDownload />
                  </div>
                  <Image className='x obj-fit' source={film.image} imageId={film.poster.asset._ref} size={400} alt={film.title} />
                </div>
                <div className='film__content-inner x px1'>
                  <h3 className='m0 p0'>{film.title}</h3>
                  <div className='container--xs'>
                    <BlockContent blocks={film.overview} />
                  </div>
                  {film.fileDownloads && (
                    <div>
                      <h5 className='akz-e caps mb0'>Downloads</h5>
                      <div className='film__content-downloads container--xs f fw jcs aic'>
                        {film.fileDownloads && film.fileDownloads.map(download => (
                          <div key={download._key} className='f film__content-single jcs aic'>
                            <a href={download.fileUrl || `${download.download}?dl=${download.fileTitle}.zip`} className='f jcs film__link aic'>
                              <IoIosCloudDownload /><h5 className='m0 p0 ml05'>{download.fileTitle}</h5>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {film.clipDownloads && (
                    <div>
                      <h5 className='akz-e caps mb0'>Clip Downloads</h5>
                      <div className='film__content-downloads container--xs f fw jcs aic'>
                        {film.clipDownloads && film.clipDownloads.map(download => (
                          <div key={download._key} className='f film__content-single jcs aic'>
                            <a href={download.fileUrl || `${download.download}?dl=${download.fileTitle}.zip`} className='f jcs film__link aic'>
                              <IoIosCloudDownload /><h5 className='m0 p0 ml05'>{download.fileTitle}</h5>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {film.imagePreviews && (
                    <div className='film__images f fw jcs'>
                      {film.imagePreviews.map(single => (
                        <div key={single.image} className='film__images-single mr1 mb1 rel'>
                          <a className='abs top z2 left x y' href={`${single.image}?dl=${single._key}`} />
                          <div className='abs z1 film__images-single-icon'>
                            <IoIosCloudDownload />
                          </div>
                          <Image className='x obj-fit' source={`${single.image}?w=400`} alt='' />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Loading>
        ) : (
            <div />
          )}
      </div>
    )
  }
}

export default Film