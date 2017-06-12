import React, { Component } from 'react'
import SSConfig from './ss_config'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>Yes, here.</h1>
        <SSConfig />
      </div>
    )
  }
}

export default App
