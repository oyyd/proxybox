import * as operations from 'shadowsocks-js/lib/pm'

const PROC = 'local'

// TODO:
const TEST_CONFIG = {
  password: 'holic123',
  serverAddr: 'kr.oyyd.net',
}

export function start(config = TEST_CONFIG) {
  operations.start(PROC, config)
}

export function stop() {
  operations.stop(PROC)
}

export function restart(config = TEST_CONFIG) {
  operations.restart(PROC, config)
}
