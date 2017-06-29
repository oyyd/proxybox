import React, { Component } from 'react'
import { Button, Divider, Form, Input } from 'semantic-ui-react'
import { startSS, stopSS, restartSS,
  updateSSConfig, getSSConfig } from './ipc'

const FIELDS = [{
  name: 'serverAddr',
}, {
  name: 'serverPort',
}, {
  name: 'localPort',
}, {
  name: 'password',
}, {
  name: 'pacServerPort',
}, {
  name: 'method',
}]

const styles = {
  label: {
    width: '100px',
    textAlign: 'right',
  },
  item: {
    marginBottom: 12,
  },
}

class SSConfig extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)

    this.state = {}
  }

  componentWillMount() {
    const config = getSSConfig()

    this.setState(config.ss.proxyOptions)
  }

  // eslint-disable-next-line
  onSubmit(e) {
    e.preventDefault()

    updateSSConfig(this.state)
  }

  render() {
    const { onSubmit } = this

    return (
      <Form size="mini" key="mini" onSubmit={onSubmit}>
        <Form.Group inline widths="equal">
          {FIELDS.map(({ name }) => (
            <Form.Field
              key={name}
              style={{ marginBottom: 20 }}
            >
              <label style={styles.label}>{name}</label>
              <Input
                placeholder={name}
                value={this.state[name] || ''}
                onChange={e => this.setState({ [name]: e.target.value })}
              />
            </Form.Field>
          ))}
        </Form.Group>
        <Button primary type="submit">修改</Button>
        <div>
          <Button onClick={() => startSS()}>开始</Button>
          <Button onClick={() => stopSS()}>结束</Button>
          <Button onClick={() => restartSS()}>重新启动</Button>
        </div>
        <Divider hidden />
      </Form>
    )
  }
}

export default SSConfig
