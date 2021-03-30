import React from 'react'
import { Link } from '@reach/router'
import sanityClient from '@sanity/client'
import BlockContent from '@sanity/block-content-to-react'
import {
  IoIosCloudDownload,
  IoIosPlay,
  IoMdClose
} from 'react-icons/io'
import cx from 'classnames'
import MicroModal from 'micromodal'
import Environment from '../util/environment.js'
import spacetime from 'spacetime'
import Image from './image.js'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Thumbs, Navigation, A11y} from 'swiper'

SwiperCore.use([Thumbs, Navigation, A11y]);
const client = sanityClient({
  projectId: 'xq1bjtf4',
  dataset: Environment(),
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
  constructor(props) {
    super(props)
    this.state = {
      film: null,
      thumbsSwiper: null
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
  componentWillReceiveProps(props) {
    console.log('state updated?')
  }
  
  render() {
    const {
      film,
      thumbsSwiper
    } = this.state

    const setThumbsSwiper = (val) => {
      this.setState({
        thumbsSwiper: val
      })
    }
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
              <div className='f jcb ais film__wrapper'>
                <div className='rel x film__poster'>
                  {film.image && (
                    <React.Fragment>
                      <a className='abs top z2 left x y' href={`${film.image}?dl=${film.poster.asset._ref}`} />
                      <div className='abs z1 film__images-single-icon'>
                        <IoIosCloudDownload />
                      </div>
                      <Image className='x obj-fit' source={film.image} imageId={film.poster.asset._ref} size={400} alt={film.title} />
                    </React.Fragment>
                  )}
                </div>
                <div className='film__content-inner'>
                  <h3 className='m0 p0'>{film.title}</h3>
                  <div className='container--xs'>
                    <BlockContent blocks={film.overview} />
                  </div>
                  {(film.releaseDate || film.previewDates) && (
                    <div>
                      <h5 className='akz-e caps mb0'>Release Date</h5>
                      <div className='film__content-dates container--xs'>
                        {!film.previewDates
                          ? (<p className='film__content-date film__content-date--release'>{spacetime(film.releaseDate).dayName()} {spacetime(film.releaseDate).monthName()} {spacetime(film.releaseDate).date()} {spacetime(film.releaseDate).year()}</p>)
                          : (<p className='film__content-date film__content-date--preview'>{film.previewDates && film.previewDates.map(date => (
                            <span>{date}</span>
                          ))}</p>)
                        }
                      </div>
                    </div>
                  )}
                  {film.fileDownloads && (
                    <div>
                      <h5 className='akz-e caps mb0'>Downloads</h5>
                      <div className='film__content-downloads container--xs f fw jcb aic'>
                        {film.fileDownloads && film.fileDownloads.map(download => (
                          <div key={download._key} className='f film__content-single jcs aic'>
                            {!download.fileUrl
                              ? (<a href={`${download.download}?dl=${download.fileTitle}.${download.file.extension}`} className='f jcs film__link aic'>
                                  <IoIosCloudDownload />
                                  <h5 className='m0 p0 ml05'>{download.fileTitle}</h5>
                                </a>)
                              : (<a href={download.fileUrl} target="_blank" rel="noopener noreferrer" className='f jcs film__link aic'>
                                  <IoIosCloudDownload />
                                  <h5 className='m0 p0 ml05'>{download.fileTitle}</h5>
                                </a>)
                            }
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {film.clipDownloads && (
                    <div>
                      <h5 className='akz-e caps mb0'>Clip Downloads</h5>
                      <div className='film__content-downloads container--xs f fw jcb aic'>
                        {film.clipDownloads && film.clipDownloads.map(download => (
                          <div key={download._key} className='film__content-single jcs aic'>
                            {download.vimeoId && download.vimeoImage && (
                              <div>
                                <div className='rel film__video-preview mb05' data-micromodal-trigger={`${download.vimeoId}`} onClick={() => this.openModal(download.vimeoId)}>
                                  <div className='abs z1 film__images-single-icon'>
                                    <IoIosPlay />
                                  </div>
                                  <Image className='x object-fit' source={`${download.image}?w=400`} alt='' />
                                </div>
                                <div className='modal x f jcc aic' id={`${download.vimeoId}`} aria-hidden="true">
                                  <div className='x' tabIndex="-1" data-micromodal-close>
                                    <div className='x' role="dialog" aria-modal="true" aria-labelledby={`${download.vimeoId}-title`} >
                                    
                                      <div className='modal__video rel ma x' id={`${download.vimeoId}-content`}>
                                        <button onClick={() => this.closeModal(download.vimeoId)} className='abs f jcc aic modal__close z1 right top ' aria-label="Close modal" data-micromodal-close>
                                          <IoMdClose />
                                        </button>
                                        <div
                                          id={`vimeo-${download.vimeoId}`}
                                          className='js-film__preview film__preview'
                                          data-plyr-provider="vimeo"
                                          data-plyr-embed-id={download.vimeoId}
                                          preload="true"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <a href={download.fileUrl || `${download.download}?dl=${download.fileTitle}.zip`} className='f jcs film__link aic'>
                              <IoIosCloudDownload /><h5 className='m0 p0 ml05'>{download.fileTitle}</h5>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {film.imagePreviews && (
                  <div>
                    <h5 className='akz-e caps mb0'>Image Previews</h5>
                    <div className='film__content-downloads film__images f fw jcb'>
                      <Swiper 
                        onSwiper={setThumbsSwiper}
                        watchSlidesVisibility
                        watchSlidesProgress
                        loop={film.imagePreviews.length > 5 ? true : false}
                        slideToClickedSlide={true}
                        slidesPerView={5}
                        navigation
                        threshold={4}
                        spaceBetween={15}
                        className="film__images-container film__images-container--slide-auto"
                      >
                      {film.imagePreviews.map((single, idx) => (
                          <SwiperSlide key={idx} className='film__images-single swiper-slide-auto'>
                            <Image className='x obj-fit' source={`${single.image}?w=400`} alt='' />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <Swiper 
                        id="main"
                        tag="section"
                        loop={film.imagePreviews.length > 1 ? true : false }
                        thumbs={{swiper: thumbsSwiper}}
                        navigation
                        threshold={4}
                        slidesPerView={film.imagePreviews.length > 1 ? 1 : 1}
                        spaceBetween={15}
                        className="film__images-container film__images-container--slide"
                      >
                        {film.imagePreviews.map((single, idx) => (
                          <SwiperSlide key={idx} className='film__images-single'>
                            <div className='slide__inner'>
                              <Image className='x obj-fit' source={`${single.image}?w=700`} alt='' />
                              <div className="download-link">
                                <a href={`${single.image}?dl=${single.image}`} className="f jcs film__link aic">
                                  <IoIosCloudDownload />
                                  <h5 className='m0 p0 ml05'>Download Image</h5>
                                </a>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
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
