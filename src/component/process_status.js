import React, { Component } from 'react'
import { Button, Radio } from 'semantic-ui-react'
import { enableProxy, disableProxy, setProxy,
  getProcessStatus, startSS, stopSS, startHTPS, stopHTPS,
} from './ipc'

const PREFIX = 'proxybox:'

const styles = {
  progress: {
    margin: '10px 0',
  },
  info: {
    display: 'inline-block',
  },
}

const processOperations = {
  ss: {
    start: startSS,
    stop: stopSS,
  },
  hpts: {
    start: startHTPS,
    stop: startHTPS,
  },
}

function removePrefix(name) {
  if (name.indexOf(PREFIX) === 0) {
    return name.slice(PREFIX.length)
  }

  return name
}

function filterProps(appInfo) {
  return {
    name: removePrefix(appInfo.name),
    pid: appInfo.pid,
    status: appInfo.pm2_env.status,
  }
}

class ProcessStatus extends Component {
  constructor(props) {
    super(props)

    this.updateApps = this.updateApps.bind(this)
    this.changeProcessStatus = this.changeProcessStatus.bind(this)

    this.state = {
      appInfo: null,
      processStatus: {},
    }
  }

  componentWillMount() {
    getProcessStatus().then(res => this.updateApps(res))
  }

  updateApps(res) {
    const { apps } = res
    const appInfo = apps.map(filterProps)
    const processStatus = {}

    appInfo.forEach((info) => {
      const isOn = info.status === 'online'
      processStatus[info.name] = isOn
    })

    this.setState({
      appInfo,
      processStatus,
    })
  }

  changeProcessStatus(name, on) {
    const operationName = on ? 'start' : 'stop'
    const operation = processOperations[name][operationName]

    // TODO:
    operation()
  }

  render() {
    const { changeProcessStatus } = this
    const { appInfo, processStatus } = this.state

    // TODO: return loading info
    if (!Array.isArray(appInfo)) {
      return null
    }

    return (
      <div>
        <div>
          {appInfo.map(({ name }) => {
            const isOn = !!processStatus[name]
            return (
              <div key={name} style={styles.process}>
                <div style={styles.info}>
                  {name}
                </div>
                <div style={styles.info}>
                  <Radio
                    checked={isOn}
                    onChange={() => changeProcessStatus(name, !isOn)}
                    toggle
                  />
                </div>
              </div>
            )
          })}
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
