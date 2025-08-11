import React from 'react'
import sanityClient from '@sanity/client'
import FilmRow from './filmRow.js'
import Environment from '../util/environment.js'

const client = sanityClient({
  projectId: 'xq1bjtf4',
  dataset: Environment(), // get dataset based on current environment
  useCdn: false // `false` if you want to ensure fresh data
})
const queryProducts = `*[_type == "product"] | order(releaseDate desc)`

class Products extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }
  componentDidMount() {
    client
      .fetch(queryProducts)
      .then(res => {
        this.setState({
          products: res
        })
      })
      .catch(err => {
        console.log('error', err)
      })

  }
  render() {
    const {
     products
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
              <h5 className='caps akz-e'>Product</h5>
            </div>
            <div className='mr05'>
              <h5 className='caps akz-e col-1'>Release Date</h5>
            </div>
          </div>
          <div className='films__content x'>
            {products.map(product => (
              <FilmRow content={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Products