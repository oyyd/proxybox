import React, { Component } from 'react'
import { Button, Radio, Table } from 'semantic-ui-react'
import fecha from 'fecha'
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
    marginRight: '10px',
  },
}

const fields = [
  { title: '进程名称', name: 'name' },
  { title: 'pid', name: 'pid' },
  { title: '重启次数', name: 'restartTime' },
  { title: '启动时间', name: 'uptime', cell: value => (fecha.format(new Date(value), 'MM-DD hh:mm:ss')) },
  { title: '内存占用', name: 'memory', cell: value => `${(value / 1024 / 1024).toFixed(2)}MB` },
]

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
  const { monit, pid, pm2_env } = appInfo
  const { memory } = monit
  const { pm_uptime: uptime, restart_time: restartTime } = pm2_env

  return {
    name: removePrefix(appInfo.name),
    pid,
    status: appInfo.pm2_env.status,
    memory,
    restartTime,
    uptime,
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
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              {fields.map(({ title }) => (
                <Table.HeaderCell>{title}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {appInfo.map((row) => {
              const isOn = !!processStatus[row.name]

              return (
                <Table.Row key={row.name} style={styles.process}>
                  <Table.Cell collapsing>
                    <Radio
                      checked={isOn}
                      onChange={() => changeProcessStatus(row.name, !isOn)}
                      toggle
                    />
                  </Table.Cell>
                  {fields.map(({ name, cell }) => {
                    const value = row[name]

                    return (
                      <Table.Cell key={name}>
                        {cell ? cell(value, name) : value}
                      </Table.Cell>
                    )
                  })}
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
        <div style={{ display: 'none' }}>
          <Button onClick={() => enableProxy()}>enableProxy</Button>
          <Button onClick={() => disableProxy()}>disableProxy</Button>
          <Button onClick={() => setProxy()}>setProxy</Button>
        </div>
      </div>
    )
  }
}

export default ProcessStatus
