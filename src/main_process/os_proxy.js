/**
 * bind os-proxy-socks and SOCKS proxy info
 */

// TODO:
import { get, set } from 'os-proxy-socks/lib/index'

export { get, enable, disable } from 'os-proxy-socks/lib/index'

export function getSOCKSConfig(proxyOptions) {
  const { port } = proxyOptions

  return {
    // NOTE: consider to use local ip at some point
    server: '127.0.0.1',
    port,
  }
}

function needSet(proxyOptions) {
  const { server, port } = proxyOptions

  return get().then(info => server === info.server && port === info.port)
}

export function setProxy(proxyOptions) {
  const config = getSOCKSConfig(proxyOptions)

  return needSet(proxyOptions).then((same) => {
    if (same) {
      return same
    }

    return set(config)
  })
}

// if (module === require.main) {
//   setProxy({
//     server: '127.0.0.1',
//     port: 1080,
//   }).then(same => console.log(same))
// }
