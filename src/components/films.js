import React from 'react'
import sanityClient from '@sanity/client'
import FilmRow from './filmRow.js'

const client = sanityClient({
  projectId: 'xq1bjtf4',
  dataset: 'production',
  useCdn: false // `false` if you want to ensure fresh data
})
const queryFilms = `*[_type == "movie"] | order(releaseDate desc)`

class Films extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      films: []
    }
  }
  componentDidMount() {
    client
      .fetch(queryFilms)
      .then(res => {
        this.setState({
          films: res
        })
      })
      .catch(err => {
        console.log('error', err)
      })

  }
  render() {
    const {
      films
    } = this.state
    return (
      <div>
        <div>
          <div className='container--xs'>
          </div>
        </div>
        <div className='films__wrapper'>
          <div className='films__header f jcb aic'>
            <div className='ml05'>
              <h5 className='caps akz-e'>Films</h5>
            </div>
            <div className='mr05'>
              <h5 className='caps akz-e col-1'>Release Date</h5>
            </div>
          </div>
          <div className='films__content x'>
            {films.map(film => (
              <FilmRow content={film} key={film._id} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Films