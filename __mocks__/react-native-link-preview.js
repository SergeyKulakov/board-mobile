export default {
  getPreview: url =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          url,
          images: 'images',
          favicons: 'favicons',
          mediaType: 'video',
        })
      }, 1000)
    }),
}
