import { isBase64 } from 'Helpers/isBase64'

export function transformImages(prevImages, nextImages) {
  const items = (nextImages || []).map(el => el.image)

  const newImages = items.filter(el => isBase64(el))
  const removerItems = (prevImages || []).filter(el => items.indexOf(el) === -1)
  const otherItems = items.filter(
    el => !isBase64(el) && removerItems.indexOf(el) === -1,
  )

  return [
    ...newImages,
    ...removerItems.map(el => ({ status: 'deleted', _id: el })),
    ...otherItems,
  ]
}
