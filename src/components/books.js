import React from 'react'
import ContentList from './contentList.js'
import { client } from '../util/client.js'

const queryBooks = `*[_type == "book"] | order(releaseDate desc)`

class Books extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }
  componentDidMount() {
    client
      .fetch(queryBooks)
      .then(res => {
        this.setState({
          books: res
        })
      })
      .catch(err => {
        console.log('error', err)
      })

  }
  render() {
    const {
      books
    } = this.state
    return (
      <ContentList content={books} contentType={'books'} />
    )
  }
}

export default Books