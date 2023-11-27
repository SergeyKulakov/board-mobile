export const secondsToTime = time => {
  return `${~~(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`
}
