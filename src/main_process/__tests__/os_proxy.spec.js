import { getSOCKSConfig } from '../os_proxy'

describe('os_proxy', () => {
  let proxyOptions = null

  beforeEach(() => {
    proxyOptions = {
      port: 1081,
    }
  })

  describe('getSOCKSConfig', () => {
    it('should return an object with "server" and "port"', () => {
      const res = getSOCKSConfig(proxyOptions)

      expect(res.server).toBe('127.0.0.1')
      expect(res.port).toBe(1081)
    })
  })
})
