export const getDataWithAds = data => {
  const result = []

  data.forEach((el, key) => {
    const index = key + 1
    if (data[key + 1]) {
      if (index % 5 === 0) {
        result.push(el)
        result.push('ads')
      } else if (index === 3 || index % 7 === 0) {
        result.push(el)
        result.push('sponsor')
      } else result.push(el)
    } else result.push(el)
  })

  return result
}
