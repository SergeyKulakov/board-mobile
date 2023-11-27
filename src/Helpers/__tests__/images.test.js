import { transformImages } from '../images'

it('Helpers/images', () => {
  const prevImages = new Array(5).fill(true).map((_, index) => ({
    image: `image-${index}`,
  }))
  const nextImages = new Array(7).fill(true).map((_, index) => ({
    image: `image-${index}`,
  }))

  const result = transformImages(prevImages, nextImages)

  expect(result).toStrictEqual([
    { status: 'deleted', _id: { image: 'image-0' } },
    { status: 'deleted', _id: { image: 'image-1' } },
    { status: 'deleted', _id: { image: 'image-2' } },
    { status: 'deleted', _id: { image: 'image-3' } },
    { status: 'deleted', _id: { image: 'image-4' } },
    'image-0',
    'image-1',
    'image-2',
    'image-3',
    'image-4',
    'image-5',
    'image-6',
  ])
})
