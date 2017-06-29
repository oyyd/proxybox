import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { enableProxy, disableProxy, setProxy,
  getProcessStatus, bindProcessStatusUpdated,
  unbindProcessStatusUpdated } from './ipc'

function filterProps(appInfo) {
  return {
    name: appInfo.name,
    pid: appInfo.pid,
    status: appInfo.pm2_env.status,
  }
}

class ProcessStatus extends Component {
  constructor(props) {
    super(props)

    this.updateApps = this.updateApps.bind(this)

    this.state = {
      appInfo: null,
    }
  }

  componentWillMount() {
    bindProcessStatusUpdated(this.updateApps)

    getProcessStatus()
  }

  componentWillUnmount() {
    unbindProcessStatusUpdated(this.updateApps)
  }

  updateApps(res) {
    const { apps } = res

    this.setState({
      appInfo: apps.map(filterProps),
    })
  }

  render() {
    const { appInfo } = this.state

    return (
      <div>
        <div>
          {JSON.stringify(appInfo)}
        </div>
        <div>
          <Button onClick={() => enableProxy()}>enableProxy</Button>
          <Button onClick={() => disableProxy()}>disableProxy</Button>
          <Button onClick={() => setProxy()}>setProxy</Button>
        </div>
      </div>
    )
  }
}

export default ProcessStatus
