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
        <SSConfig />
      </div>
    )
  }
}

export default App
