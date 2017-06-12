import url from 'url'
import path from 'path'
import { nativeImage } from 'electron'

export function createNativeImage(name, options) {
  const imgURL = url.format({
    slashes: true,
    pathname: path.resolve(__dirname, '../../../assets/imgs/', name),
  })

  const img = nativeImage.createFromPath(imgURL)

  return options ? img.resize(options) : img
}
