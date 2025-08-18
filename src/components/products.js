import React from 'react'
import {client} from '../util/client'
import ContentList from './contentList.js'

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
      <ContentList content={products} contentType='products'/>
    )
  }
}

export default Products