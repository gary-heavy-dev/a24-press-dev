import React from 'react'
import { Link } from '@reach/router'
import spacetime from 'spacetime'

class FilmRow extends React.Component {
  render() {
    const {
      title,
      slug,
      releaseDate
    } = this.props.content
    const date = spacetime(releaseDate)
    return (
      <div className='py1 films__row x f jcb aic rel'>
        <Link to={`/films/${slug.current}`} className='abs z1 x y top left' />
        <div className='ml05 f jcb aic'>
          <h4 className='m0 p0'>{title}</h4>
          <svg fill='currentColor' className='ml1' version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 55 20"><polygon fillRule='evenodd' clipRule='evenodd' points="43.3,0 55,10 43.3,20 42.4,19.1 52.2,10.7 0,10.7 0,9.3 52.2,9.3   42.4,0.9 43.3,0 " /></svg>
        </div>
        <div className='mr05'>
          <h4 className='small caps m0 p0 akz-e'>{date.dayName()} {date.monthName()} {date.date()} {date.year()}</h4>
        </div>
      </div>
    )
  }
}

export default FilmRow
