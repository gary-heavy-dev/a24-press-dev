import React, { Component } from 'react'
import FilmRow from './filmRow.js'

class ContentList extends Component {
  render() {
    const { content = [], contentType } = this.props
    return (
      <div>
        <div>
          <div className='container--xs'>
          </div>
        </div>
        <div className='films__wrapper'>
          <div className='films__header f jcb aic'>
            <div className='ml05'>
              <h5 className='caps akz-e'>{contentType}</h5>
            </div>
            <div className='mr05'>
              <h5 className='caps akz-e col-1'>Release Date</h5>
            </div>
          </div>
          <div className='films__content x'>
            {content.map(film => (
              <FilmRow content={film} key={film._id} parent={contentType}/>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ContentList