import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { enableProxy, disableProxy, setProxy } from './ipc'

class ProcessStatus extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Button onClick={() => enableProxy()}>enableProxy</Button>
        <Button onClick={() => disableProxy()}>disableProxy</Button>
        <Button onClick={() => setProxy()}>setProxy</Button>
      </div>
    )
  }
}

export default ProcessStatus
