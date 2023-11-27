export const minutes = new Array(60)
  .fill(1)
  .map((el, index) => index)
  .filter(el => el % 5 === 0)

export const hours = new Array(24).fill(1).map((el, index) => index)

export default {
  screenIds: {
    root: 'root',
    date: 'date',
    minutes: 'minutes',
    hours: 'hours',
  },
}
