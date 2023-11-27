import data from 'Constants/country-currency-codes'

export const getSearchData = string => {
  if (!string || typeof string !== 'string') return data

  const value = string.toLowerCase()

  return data.filter(
    el =>
      el.country.toLowerCase().indexOf(value) !== -1 ||
      el.country.toLowerCase().indexOf(value) !== -1 ||
      el.code.toLowerCase().indexOf(value) !== -1,
  )
}

export default data
