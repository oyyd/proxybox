import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { startHTPS, stopHTPS, restartHTPS } from './ipc'
// import PropTypes from 'prop-types'

class HTPSConfig extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
    }
  }

  render() {
    return (
      <div>
        <Button
          onClick={startHTPS}
        >
          开始
        </Button>
        <Button
          onClick={stopHTPS}
        >
          结束
        </Button>
        <Button
          onClick={restartHTPS}
        >
          重启
        </Button>
      </div>
    )
  }
}

export default HTPSConfig
